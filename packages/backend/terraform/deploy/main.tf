module "resources" {
  source           = "../resources"
  hosted_zone_name = "zendog.site"
  domain_name      = "api.zendog.site"
  default_name     = "zendog"
  frontend_domain  = "https://zendog.site"
}
