terraform {
  backend "s3" {
    key            = "zendog/backend.tfstate"
    region         = "us-east-2"
    bucket         = "mattcullenmeyer-terraform-state"
    dynamodb_table = "mattcullenmeyer-terraform-lock"
    profile        = "personal"
  }
}
