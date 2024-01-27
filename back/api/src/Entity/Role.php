<?php

namespace App\Entity;

enum Role: string
{
    case CEO = 'CEO';
    case MANAGER = 'MANAGER';
    case EMPLOYEE = 'EMPLOYEE';
}
