locals {
  hosted_zone_name = "zendog.site"
  domain_name      = "api.zendog.site"
  default_name     = "zendog"
}

module "resources" {
  source           = "../resources"
  hosted_zone_name = local.hosted_zone_name
  domain_name      = local.domain_name
  default_name     = local.default_name
}
