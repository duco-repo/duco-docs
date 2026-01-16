<script setup>

const { clientId } = useRuntimeConfig().public;

function loginWithGithub() {
  const redirectUri = 'http://localhost:3008/api/auth/callback/github';

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = githubAuthUrl;
}
onMounted(() => {
  loginWithGithub();
})
</script>

<template>
  
</template>
