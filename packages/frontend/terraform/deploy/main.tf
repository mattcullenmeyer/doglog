module "deploy" {
  source           = "../resources"
  domain_name      = "zendog.site"
  hosted_zone_name = "zendog.site"
}
