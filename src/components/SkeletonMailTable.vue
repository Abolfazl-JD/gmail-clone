<script setup lang="ts"></script>

<template>
    <table class="w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-14"
            v-for="index of 10" :key="index">
                <td class="table-items w-9">
                    <p class="w-full skeleton h-7 rounded-sm"></p>
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

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 75%);
  }

  100% {
    background-color: hsl(200, 20%, 85%);
  }
}
</style>