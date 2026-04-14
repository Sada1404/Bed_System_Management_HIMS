'use server'
import { createClient } from "../../utils/supabase/server";

export const getAdvancePayments = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('advance_payments')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getAdvancePaymentById = async (id) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('advance_payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createAdvancePayment = async (paymentData) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('advance_payments')
      .insert([{
        bill_id: paymentData.billId,
        patient_id: paymentData.patientId,
        aid: paymentData.aid,
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        card_cheque_no: paymentData.cardChequeNo,
        receipt_no: paymentData.receiptNo,
        date: paymentData.date
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateAdvancePayment = async (id, paymentData) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('advance_payments')
      .update({
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        card_cheque_no: paymentData.cardChequeNo,
        receipt_no: paymentData.receiptNo,
        date: paymentData.date
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteAdvancePayment = async (id) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from('advance_payments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};