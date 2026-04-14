'use server'

import { createClient } from '../../utils/supabase/server'

export async function createBedAssignment(formData) {
  const supabase = await createClient()
  try {
    // First check if the bed is available
    const { data: bedData, error: bedError } = await supabase
      .from('beds')
      .select('status, bed_type, charge')
      .eq('id', formData.bedId)
      .single()

    if (bedError || !bedData || bedData.status !== 'active') {
      throw new Error('Selected bed is not available')
    }

    // Validate required fields
    if (!formData.patientId || !formData.bedId || !formData.doctorName || 
        !formData.assignDate || !formData.dischargeDate) {
      throw new Error('Missing required fields')
    }

    const { data, error } = await supabase
      .from('bed_assigned')
      .insert([{
        patient_id: formData.patientId,
        bed_id: formData.bedId,
        bed_type: formData.bedType || bedData.bed_type,
        doctor_name: formData.doctorName,
        description: formData.description || '',
        charge: formData.charge || bedData.charge,
        assign_date: formData.assignDate,
        discharge_date: formData.dischargeDate,
        status: formData.status || 'active'
      }])
      .select()
      .single()

    if (error) throw error
    
    // Update bed status to occupied
    await supabase
      .from('beds')
      .update({ status: 'occupied' })
      .eq('id', formData.bedId)
    
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function updateBedAssignment(id, formData) {
  const supabase = await createClient()
  try {
    // Validate required fields
    if (!formData.patientId || !formData.bedId || !formData.doctorName || 
        !formData.assignDate || !formData.dischargeDate) {
      throw new Error('Missing required fields')
    }

    const { data, error } = await supabase
      .from('bed_assigned')
      .update({
        patient_id: formData.patientId,
        bed_id: formData.bedId,
        bed_type: formData.bedType,
        doctor_name: formData.doctorName,
        description: formData.description || '',
        charge: formData.charge,
        assign_date: formData.assignDate,
        discharge_date: formData.dischargeDate,
        status: formData.status || 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function deleteBedAssignment(id) {
  const supabase = await createClient()
  try {
    // First get the bed ID to update its status
    const { data: assignment, error: fetchError } = await supabase
      .from('bed_assigned')
      .select('bed_id')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the assignment
    const { error } = await supabase
      .from('bed_assigned')
      .delete()
      .eq('id', id)

    if (error) throw error
    
    // Update bed status back to active
    if (assignment?.bed_id) {
      await supabase
        .from('beds')
        .update({ status: 'active' })
        .eq('id', assignment.bed_id)
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function getBedAssignments() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('bed_assigned')
      .select(`
        *,
        beds:bed_id (bed_number, ward, floor)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching bed assignments:', error)
    return { success: false, error: error.message }
  }
}

export async function getBedAssignmentById(id) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('bed_assigned')
      .select(`
        *,
        beds:bed_id (bed_number, ward, floor)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching bed assignment by ID:', error)
    return { success: false, error: error.message }
  }
}

export async function getBedAssignmentReports(startDate, endDate) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('bed_assigned')
      .select(`
        *,
        beds:bed_id (bed_number, ward, floor)
      `)
      .gte('assign_date', startDate)
      .lte('assign_date', endDate)
      .order('assign_date', { ascending: false })

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching bed assignment reports:', error)
    return { success: false, error: error.message }
  }
}