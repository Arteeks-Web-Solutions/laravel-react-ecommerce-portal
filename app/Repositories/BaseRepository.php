<?php

namespace TechStore\Repositories;

use Illuminate\Database\Eloquent\Model;

class BaseRepository
{
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a record by its primary key.
     *
     * @param int $id
     * @return Model|null
     */
    public function find(int $id)
    {
        return $this->model->find($id);
    }

    /**
     * Create a new record.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Create multiple records.
     *
     * @param array $categories
     * @return bool
     */
    public function createMany(array $categories)
    {
        return $this->model->insert($categories);
    }

    /**
     * Update a record by its primary key.
     *
     * @param int $id
     * @param array $data
     * @return Model|null
     */
    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        if ($record) {
            $record->update($data);
        }
        return $record;
    }

    /**
     * Delete a record by its primary key.
     *
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }

    /**
     * Truncate the model's table.
     *
     * @return void
     */
    public function truncate()
    {
        return $this->model->truncate();
    }

    /**
     * Find a record by a specific column and value.
     *
     * @param string $column
     * @param mixed $value
     * @return Model|null
     */
    public function findBy(string $column, $value)
    {
        return $this->model->where($column, $value)->first();
    }

    /**
     * Paginate records.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(int $perPage = 15)
    {
        return $this->model->paginate($perPage);
    }
}
