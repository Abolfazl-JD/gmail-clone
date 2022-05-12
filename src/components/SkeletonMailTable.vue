<script setup lang="ts"></script>

<template>
    <h1 class="skeleton w-24 h-5 rounded-lg mb-5 block mx-auto"></h1>
    <div class="w-1000px flex mx-auto items-center justify-center gap-2 mb-5">
        <p class="skeleton w-16 h-7 rounded-sm"></p>
        <p class="skeleton w-16 h-7 rounded-sm"></p>
    </div>
    <div class="w-1000px mx-auto mb-5 text-left flex gap-2 items-center">
        <p class="input-skeleton border-6 border-solid w-7 h-7 rounded-sm"></p>
        <p class="skeleton w-20 h-8 rounded-sm"></p>
        <p class="skeleton w-20 h-8 rounded-sm"></p>
        <p class="skeleton w-20 h-8 rounded-sm"></p>
        <p class="skeleton w-20 h-8 rounded-sm"></p>
    </div>
    <table class="w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-14"
            v-for="index of 9" :key="index">
                <td class="table-items w-9">
                    <p class="w-full input-skeleton border-6 border-solid h-7 rounded-sm"></p>
                </td>
                <td class="table-items w-1/6">
                    <p class="w-full skeleton h-5 rounded-lg"></p>
                </td>
                <td class="table-items w-7/12">
                    <p class="w-full skeleton h-5 rounded-lg"></p>
                </td>
                <td class="table-items w-120px">
                    <p class="w-full skeleton h-5 rounded-lg"></p>
                </td>
                <td class="table-items w-18">
                    <p class="w-full skeleton h-7 rounded-sm"></p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.skeleton {
  animation: skeleton-loading 0.5s linear infinite alternate;
}

.input-skeleton {
    animation: input-loading 0.5s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 75%);
  }

  100% {
    background-color: hsl(200, 20%, 85%);
  }
}

@keyframes input-loading {
  0% {
    border-color: hsl(200, 20%, 75%);
  }

  100% {
    border-color: hsl(200, 20%, 85%);
  }
}
</style>