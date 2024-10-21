terraform {
  backend "s3" {
    key            = "zendog/frontend.tfstate"
    region         = "us-east-2"
    bucket         = "mattcullenmeyer-terraform-state"
    dynamodb_table = "mattcullenmeyer-terraform-lock"
    profile        = "personal"
  }
}
