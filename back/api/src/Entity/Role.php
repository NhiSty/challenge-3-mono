<?php

namespace App\Entity;

enum Role: string
{
    case CEO = 'CEO';
    case ADMIN = 'MANAGER';
    case EMPLOYEE = 'EMPLOYEE';
    case USER = 'USER';
}
