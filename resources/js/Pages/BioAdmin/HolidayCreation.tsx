import React from 'react'
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutBioAdmin'
import { Head, usePage } from "@inertiajs/react";

type Props = {}

const HolidayCreation = (props: Props) => {
    return (
        <AuthenticatedLayoutAdmin header={<h2>{usePage().component.split("/")[1]}</h2>}>Holiday Creation</AuthenticatedLayoutAdmin>
    )
}

export default HolidayCreation