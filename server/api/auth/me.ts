export default defineEventHandler(async (event) => {
  const access_token = await getCookie(event, 'session_user');
  const ghEmail: any = await $fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "User-Agent": "NuxtApp",
    },
  });
  const config = useRuntimeConfig();
  const primaryEmail = ghEmail.find((e: any) => e.primary)?.email;
  // ===== 白名单校验 =====
  const allowedEmails = config.allowedGithubEmails.split(",").map(s => s.trim());

  const isAllowedUser = allowedEmails.includes(primaryEmail);

  if (!isAllowedUser) {
    return {
        success: false,
        msg: 'not allowed user',
    }
  }
  return {
      success: true,
      msg: 'ok',
  }
});
