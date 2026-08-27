const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const sitePath = (path = "/") => {
  const normalizedPath = String(path).replace(/^\/+/, "");
  return normalizedPath ? `${base}${normalizedPath}` : base;
};

export const whatsappUrl = (phone, message) => {
  const normalizedPhone = String(phone).replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};
