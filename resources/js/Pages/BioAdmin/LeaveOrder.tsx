import React from 'react'
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutBioAdmin'
import { Head, usePage } from "@inertiajs/react";
type Props = {}

function LeaveOrder({ }: Props) {
    return (
        <AuthenticatedLayoutAdmin header={<h2>{usePage().component.split("/")[1]}</h2>}>Leave Order</AuthenticatedLayoutAdmin>
    )
}

export default LeaveOrder