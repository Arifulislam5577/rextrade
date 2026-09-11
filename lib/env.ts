export type SmtpCredentials = {
  readonly user: string
  readonly password: string
}

export function readSmtpCredentials(): SmtpCredentials | null {
  const user = process.env.SMTP_EMAIL
  const password = process.env.SMTP_PASSWORD

  if (!user || !password) {
    return null
  }

  return { user, password }
}
