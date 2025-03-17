export type PublishMessageParams = {
  message: string;
};

export type PublishMessageResponse = {
  id: string;
};

export type ValidateSecretParams = {
  secret: string;
};

export type ValidateSecretResponse = {
  valid: boolean;
};
