<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
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
     * Recursively converts all keys in an array to camelCase.
     *
     * @param array $array
     * @return array
     */
    protected function convertToCamelCase(array $array): array
    {
        $camelCased = [];
        foreach ($array as $key => $value) {
            // Convert the key to camelCase
            $camelKey = Str::camel($key);

            // Recursively handle arrays and nested Resources
            if (is_array($value)) {
                $value = $this->convertToCamelCase($value);
            }

            // Check for and resolve nested JsonResource objects (e.g., whenLoaded results)
            if ($value instanceof JsonResource) {
                // Force the resource to transform itself into an array
                $value = $value->toArray(request());
            }

            $camelCased[$camelKey] = $value;
        }
        return $camelCased;
    }
}
