<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-2">
      <AppFormField
        name="name"
        label="Name"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
      />
      <AppFormField
        name="lat"
        label="Latitude"
      />
      <AppFormField
        name="long"
        label="Longitude"
      />
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="btn btn-outline"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>
