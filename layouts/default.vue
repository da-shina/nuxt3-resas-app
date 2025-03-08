<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>
        RESAS Population Viewer
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app class="text-center d-flex flex-column">
      <div>
        &copy; {{ new Date().getFullYear() }} RESAS Population Viewer
      </div>
    </v-footer>
  </v-app>
</template>
