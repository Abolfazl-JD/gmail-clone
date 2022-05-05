<script setup lang="ts"></script>

<template>
    <table class="w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-14"
            v-for="index of 10" :key="index">
                <td class="table-items w-9">
                    <p class="skeleton-small"></p>
                </td>
                <td class="table-items w-1/6">
                    <p class="skeleton-text"></p>
                </td>
                <td class="table-items w-7/12">
                    <p class="skeleton-text"></p>
                </td>
                <td class="table-items w-120px">
                    <p class="skeleton-text"></p>
                </td>
                <td class="table-items w-18">
                    <p class="skeleton-small"></p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.skeleton {
  animation: skeleton-loading 0.5s linear infinite alternate;
}

.skeleton-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.skeleton-subtitle {
  width: 30%;
  height: 1.2rem;
  margin: 0 auto 5px;
}

.skeleton-title {
  width: 20%;
  height: 1.3rem;
  margin: 0 auto 20px;
}

.skeleton-text {
  width: 100%;
  height: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.125rem;
}

.skeleton-text:last-child {
  width: 80%;
  margin-bottom: 0;
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