<?php

namespace App\Entity;

enum Role: string
{
    case ADMIN = 'ROLE_ADMIN';
    case MANAGER = 'ROLE_MANAGER';
    case EMPLOYEE = 'ROLE_EMPLOYEE';
}
