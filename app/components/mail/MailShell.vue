<template>
  <div class="h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
    <slot name="header" />

    <div class="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
      <aside
        class="w-full lg:w-96 xl:w-105 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-hidden flex flex-col">
        <slot name="left" />
      </aside>

      <aside
        class="w-full lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-hidden flex flex-col">
        <slot name="middle" />
      </aside>

      <main class="flex-1 flex flex-col min-h-0 overflow-hidden p-3 lg:p-4 bg-background">
        <slot name="right" />
      </main>
    </div>

    <slot name="footer" />
  </div>
</template>
