<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Str;

abstract class BaseResource extends JsonResource
{
    /**
     * Overrides the default Laravel toArray method.
     * This method will call the abstract transformData method and then
     * apply the camelCase conversion globally.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        // Call the abstract method implemented by the child Resource
        return $this->convertToCamelCase($this->transformData($request));
    }

    /**
     * Abstract method that must be implemented by all child Resources.
     *
     * @param Request $request
     * @return array
     */
    abstract protected function transformData(Request $request): array;

    /**
     * Recursively converts data (arrays, iterables, Arrayable objects, JsonResource,
     * Stripe\Collection, plain objects) to arrays with camelCased keys.
     *
     * @param mixed $data
     * @return mixed
     */
    protected function convertToCamelCase(mixed $data): mixed
    {
        // If it's a JsonResource, force it to array first
        if ($data instanceof JsonResource) {
            return $this->convertToCamelCase($data->toArray(request()));
        }

        // If it implements Arrayable (Eloquent collections, models, etc.)
        if ($data instanceof Arrayable) {
            return $this->convertToCamelCase($data->toArray());
        }

        // Arrays: convert keys and recurse
        if (is_array($data)) {
            $camelCased = [];
            foreach ($data as $key => $value) {
                $camelKey = is_string($key) ? Str::camel($key) : $key;
                $camelCased[$camelKey] = $this->convertToCamelCase($value);
            }
            return $camelCased;
        }

        // Iterables (including Traversable, Stripe\Collection, etc.)
        if (is_iterable($data)) {
            $result = [];
            foreach ($data as $key => $value) {
                $camelKey = is_string($key) ? Str::camel($key) : $key;
                $result[$camelKey] = $this->convertToCamelCase($value);
            }
            return $result;
        }

        // Objects: try to convert to array (prefer toArray), handle Stripe objects with ->data, otherwise cast
        if (is_object($data)) {
            if (method_exists($data, 'toArray')) {
                return $this->convertToCamelCase($data->toArray());
            }

            // Stripe\Collection and many Stripe objects expose ->data property that is an array
            if (property_exists($data, 'data') && is_array($data->data)) {
                return $this->convertToCamelCase($data->data);
            }

            // Last resort: cast to array
            return $this->convertToCamelCase((array) $data);
        }

        return $data;
    }
}
