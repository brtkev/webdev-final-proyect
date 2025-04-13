<script setup>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let auth;
onMounted(() => {
    auth = getAuth();
    signOut(auth).then(() => {
        router.push('/');
    })
});
</script>
<template></template>