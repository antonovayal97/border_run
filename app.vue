<template>
    <ClientOnly >
      <UApp>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UApp>
    <MiniApp />
  </ClientOnly>
</template>

<style>
.content h2
{
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: var(--text-xl);
  line-height: var(--tw-leading, var(--text-xl--line-height));
}
.content h2:first-child
{
  margin-top: 0;
}
.content ul
{
  margin-bottom: 1rem;
}
.content p
{
  margin-bottom: .5rem;
}
</style>