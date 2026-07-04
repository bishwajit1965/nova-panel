export const buildRequestContext = (req) => {
  const context = {
    actor: req?.user || null,
    email: req?.user?.email || null,
    ip: req?.ip || null,
    userAgent: req?.get("user-agent") || null,
    roles: req?.user?.roles || [],
    plan: req?.user?.plan || null,
  };
  return context;
};
