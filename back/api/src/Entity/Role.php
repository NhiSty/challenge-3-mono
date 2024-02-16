<?php

namespace App\Entity;

enum Role: string
{
    case ADMIN = 'ADMIN';
    case MANAGER = 'MANAGER';
    case EMPLOYEE = 'EMPLOYEE';
}
