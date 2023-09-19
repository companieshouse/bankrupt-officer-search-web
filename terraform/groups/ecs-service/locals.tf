# Define all hardcoded local variable and local variables looked up from data resources
locals {
  stack_name                = "search-service" # this must match the stack name the service deploys into
  name_prefix               = "${local.stack_name}-${var.environment}"
  service_name              = "bankrupt-officer-search-web"
  container_port            = "3000" # default node port required here until prod docker container is built allowing port change via env var
  docker_repo               = "bankrupt-officer-search-web"
  lb_listener_rule_priority = 15
  lb_listener_paths         = ["/admin/officer-search/scottish-bankrupt-officer", "/admin/officer-search/scottish-bankrupt-officer/*"]
  healthcheck_path          = "/admin/officer-search/scottish-bankrupt-officer" #healthcheck path for bankrupt officer search web
  healthcheck_matcher       = "200"                                             # no explicit healthcheck in this service yet, change this when added!

  kms_alias       = "alias/${var.aws_profile}/environment-services-kms"
  service_secrets = jsondecode(data.vault_generic_secret.service_secrets.data_json)

  parameter_store_secrets = {
    "vpc_name"             = local.service_secrets["vpc_name"]
    "chs_api_key"          = local.service_secrets["chs_api_key"]
    "internal_api_url"     = local.service_secrets["internal_api_url"]
    "cdn_host"             = local.service_secrets["cdn_host"]
    "oauth2_auth_uri"      = local.service_secrets["oauth2_auth_uri"]
    "oauth2_redirect_uri"  = local.service_secrets["oauth2_redirect_uri"]
    "oauth2_token_uri"     = local.service_secrets["oauth2_token_uri"]
    "oauth2_client_id"     = local.service_secrets["oauth2_client_id"]
    "oauth2_client_secret" = local.service_secrets["oauth2_client_secret"]
    "oauth2_request_key"   = local.service_secrets["oauth2_request_key"]
    "account_url"          = local.service_secrets["account_url"]
    "cache_server"         = local.service_secrets["cache_server"]
    "cookie_secret"        = local.service_secrets["cookie_secret"]
  }

  vpc_name             = local.service_secrets["vpc_name"]
  chs_api_key          = local.service_secrets["chs_api_key"]
  internal_api_url     = local.service_secrets["internal_api_url"]
  cdn_host             = local.service_secrets["cdn_host"]
  oauth2_auth_uri      = local.service_secrets["oauth2_auth_uri"]
  oauth2_redirect_uri  = local.service_secrets["oauth2_redirect_uri"]
  oauth2_token_uri     = local.service_secrets["oauth2_token_uri"]
  oauth2_client_id     = local.service_secrets["oauth2_client_id"]
  oauth2_client_secret = local.service_secrets["oauth2_client_secret"]
  oauth2_request_key   = local.service_secrets["oauth2_request_key"]
  account_url          = local.service_secrets["account_url"]
  cache_server         = local.service_secrets["cache_server"]
  cookie_secret        = local.service_secrets["cookie_secret"]

  # create a map of secret name => secret arn to pass into ecs service module
  # using the trimprefix function to remove the prefixed path from the secret name
  secrets_arn_map = {
    for sec in data.aws_ssm_parameter.secret :
    trimprefix(sec.name, "/${local.name_prefix}/") => sec.arn
  }

  service_secrets_arn_map = {
    for sec in module.secrets.secrets :
    trimprefix(sec.name, "/${local.service_name}-${var.environment}/") => sec.arn
  }

  task_secrets = [
    { "name" : "COOKIE_SECRET", "valueFrom" : "${local.secrets_arn_map.web-oauth2-cookie-secret}" },
    { "name" : "CHS_API_KEY", "valueFrom" : "${local.service_secrets_arn_map.chs_api_key}" },
    { "name" : "CACHE_SERVER", "valueFrom" : "${local.service_secrets_arn_map.cache_server}" },
    { "name" : "OAUTH2_AUTH_URI", "valueFrom" : "${local.service_secrets_arn_map.oauth2_auth_uri}" },
    { "name" : "OAUTH2_REDIRECT_URI", "valueFrom" : "${local.service_secrets_arn_map.oauth2_token_uri}" },
    { "name" : "OAUTH2_TOKEN_URI", "valueFrom" : "${local.service_secrets_arn_map.oauth2_redirect_uri}" },
    { "name" : "OAUTH2_CLIENT_ID", "valueFrom" : "${local.service_secrets_arn_map.oauth2_client_id}" },
    { "name" : "OAUTH2_CLIENT_SECRET", "valueFrom" : "${local.service_secrets_arn_map.oauth2_client_secret}" },
    { "name" : "OAUTH2_REQUEST_KEY", "valueFrom" : "${local.service_secrets_arn_map.oauth2_request_key}" },
    { "name" : "ACCOUNT_URL", "valueFrom" : "${local.service_secrets_arn_map.account_url}" },
    { "name" : "INTERNAL_API_URL", "valueFrom" : "${local.service_secrets_arn_map.internal_api_url}" }
  ]

  task_environment = [
    { "name" : "ACCOUNT_LOCAL_URL", "value" : "${var.account_local_url}" },
    { "name" : "API_URL", "value" : "${var.api_url}" },
    { "name" : "CHS_URL", "value" : "${var.chs_url}" },
    { "name" : "CDN_HOST", "value" : "//${var.cdn_host}" },
    { "name" : "COOKIE_DOMAIN", "value" : "${var.cookie_domain}" },
    { "name" : "COOKIE_NAME", "value" : "${var.cookie_name}" },
    { "name" : "DEFAULT_SESSION_EXPIRATION", "value" : "${var.default_session_expiration}" },
    { "name" : "HUMAN_LOG", "value" : "${var.human_log}" },
    { "name" : "BANKRUPT_OFFICER_SEARCH_WEB_VERSION", "value" : "${var.bankrupt_officer_search_web_version}" },
    { "name" : "LOG_LEVEL", "value" : "${var.log_level}" },
    { "name" : "PIWIK_URL", "value" : "${var.piwik_url}" },
    { "name" : "PIWIK_SITE_ID", "value" : "${var.piwik_site_id}" },
    { "name" : "TZ", "value" : "${var.tz}" }
  ]
}
