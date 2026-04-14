'use server'
import { createClient } from "../../utils/supabase/server";

export const getBills = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getBillById = async (id) => {
  const supabase = await createClient();
  try {
    // Get bill data
    const { data: billData, error: billError } = await supabase
      .from('bills')
      .select('*')
      .eq('id', id)
      .single();

    if (billError) throw billError;

    // Get bill services
    const { data: services, error: servicesError } = await supabase
      .from('bill_services')
      .select('*')
      .eq('bill_id', id);

    if (servicesError) throw servicesError;

    // Get advance payments
    const { data: advancePayments, error: paymentsError } = await supabase
      .from('advance_payments')
      .select('*')
      .eq('bill_id', id);

    if (paymentsError) throw paymentsError;

    return { 
      data: { 
        ...billData, 
        services,
        advancePayments 
      }, 
      error: null 
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createBill = async (billData) => {
  const supabase = await createClient();
  try {
    // Calculate totals
    const subtotal = billData.services.reduce((sum, service) => sum + service.amount, 0);
    const discountAmount = subtotal * (billData.discountPercent / 100);
    const taxAmount = subtotal * (billData.taxPercent / 100);
    const total = subtotal - discountAmount + taxAmount;

    // Insert bill
    const { data: billResult, error: billError } = await supabase
      .from('bills')
      .insert([{
        patient_id: billData.patientId,
        patient_name: billData.patientName,
        aid: billData.aid,
        doctor_name: billData.doctorName,
        admission_date: billData.admissionDate,
        discharge_date: billData.dischargeDate,
        package_id: billData.packageName || null,
        insurance_name: billData.insuranceName,
        policy_no: billData.policyNo,
        discount_percent: billData.discountPercent,
        tax_percent: billData.taxPercent,
        subtotal,
        discount_amount: discountAmount,
        tax_amount: taxAmount,
        total,
        status: billData.status,
        notes: billData.notes
      }])
      .select()
      .single();

    if (billError) throw billError;

    // Insert bill services
    if (billData.services && billData.services.length > 0) {
      const servicesToInsert = billData.services.map(service => ({
        bill_id: billResult.id,
        service_id: service.id,
        service_name: service.name,
        quantity: service.quantity,
        rate: service.rate,
        amount: service.amount
      }));

      const { error: servicesError } = await supabase
        .from('bill_services')
        .insert(servicesToInsert);

      if (servicesError) throw servicesError;
    }

    // Insert advance payments
    if (billData.advancePayments && billData.advancePayments.length > 0) {
      const paymentsToInsert = billData.advancePayments.map(payment => ({
        bill_id: billResult.id,
        patient_id: billData.patientId,
        aid: billData.aid,
        amount: payment.amount,
        payment_method: payment.paymentMethod,
        card_cheque_no: payment.cardChequeNo,
        receipt_no: payment.receiptNo,
        date: payment.date
      }));

      const { error: paymentsError } = await supabase
        .from('advance_payments')
        .insert(paymentsToInsert);

      if (paymentsError) throw paymentsError;
    }

    return { data: billResult, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateBill = async (id, billData) => {
  const supabase = await createClient();
  try {
    // Calculate totals
    const subtotal = billData.services.reduce((sum, service) => sum + service.amount, 0);
    const discountAmount = subtotal * (billData.discountPercent / 100);
    const taxAmount = subtotal * (billData.taxPercent / 100);
    const total = subtotal - discountAmount + taxAmount;

    // Update bill
    const { data: billResult, error: billError } = await supabase
      .from('bills')
      .update({
        patient_id: billData.patientId,
        patient_name: billData.patientName,
        aid: billData.aid,
        doctor_name: billData.doctorName,
        admission_date: billData.admissionDate,
        discharge_date: billData.dischargeDate,
        package_id: billData.packageName || null,
        insurance_name: billData.insuranceName,
        policy_no: billData.policyNo,
        discount_percent: billData.discountPercent,
        tax_percent: billData.taxPercent,
        subtotal,
        discount_amount: discountAmount,
        tax_amount: taxAmount,
        total,
        status: billData.status,
        notes: billData.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (billError) throw billError;

    // Delete existing bill services
    const { error: deleteServicesError } = await supabase
      .from('bill_services')
      .delete()
      .eq('bill_id', id);

    if (deleteServicesError) throw deleteServicesError;

    // Insert new bill services
    if (billData.services && billData.services.length > 0) {
      const servicesToInsert = billData.services.map(service => ({
        bill_id: id,
        service_id: service.id,
        service_name: service.name,
        quantity: service.quantity,
        rate: service.rate,
        amount: service.amount
      }));

      const { error: servicesError } = await supabase
        .from('bill_services')
        .insert(servicesToInsert);

      if (servicesError) throw servicesError;
    }

    // Delete existing advance payments
    const { error: deletePaymentsError } = await supabase
      .from('advance_payments')
      .delete()
      .eq('bill_id', id);

    if (deletePaymentsError) throw deletePaymentsError;

    // Insert new advance payments
    if (billData.advancePayments && billData.advancePayments.length > 0) {
      const paymentsToInsert = billData.advancePayments.map(payment => ({
        bill_id: id,
        patient_id: billData.patientId,
        aid: billData.aid,
        amount: payment.amount,
        payment_method: payment.paymentMethod,
        card_cheque_no: payment.cardChequeNo,
        receipt_no: payment.receiptNo,
        date: payment.date
      }));

      const { error: paymentsError } = await supabase
        .from('advance_payments')
        .insert(paymentsToInsert);

      if (paymentsError) throw paymentsError;
    }

    return { data: billResult, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteBill = async (id) => {
  const supabase = await createClient();
  try {
    // Bill services and advance payments will be deleted automatically due to ON DELETE CASCADE
    const { error } = await supabase
      .from('bills')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getBillReports = async (startDate, endDate) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};