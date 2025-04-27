provider "aws" {
  region = var.aws_region
}

resource "aws_db_instance" "mariadb" {
  identifier            = "iddlesaur-db"
  engine                = "mariadb"
  engine_version        = "10.5"
  instance_class        = "db.t3.micro"
  allocated_storage     = 20
  name                  = var.db_name
  username              = var.db_user
  password              = var.db_password
  backup_retention_period = 7
  publicly_accessible   = true
  skip_final_snapshot   = true
}

output "db_endpoint" {
  value = aws_db_instance.mariadb.endpoint
}
