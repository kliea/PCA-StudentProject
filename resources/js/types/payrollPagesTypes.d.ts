

// SSL types
export interface sslProfileTypes {
    grade: number;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
}



export interface appointmentTypes {
    appointment_code: number;
    appointment_type: string;
    basic_pay_type: string;
    tax_type: string;
    has_mandatory_deduction: boolean;
};