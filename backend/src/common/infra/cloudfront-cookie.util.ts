import { env } from "@/config/env";
import { getSignedCookies } from "@aws-sdk/cloudfront-signer";

export const generateSignedCookies = () => {
  const privateKey = env.AWS_CLOUD_FRONT_KEY_PRIVATE?.replace(
    /\\n/g,
    "\n"
  );

  const domain = env.CDN_DOMAIN!;

  const expires = Math.floor(Date.now() / 1000) + 60 * 60; // 1 giờ

  const policy = JSON.stringify({
    Statement: [
      {
        Resource: `https://${domain}/*`,
        Condition: {
          DateLessThan: {
            "AWS:EpochTime": expires,
          },
        },
      },
    ],
  });

  const cookies = getSignedCookies({
    keyPairId: env.AWS_CLOUD_FRONT_KEY_PAIR!,
    privateKey: privateKey!,
    policy,
  });

  return cookies;
};