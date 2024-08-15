#!/bin/bash

docker exec postgres psql -U postgres -f populate.sql ecommercedb