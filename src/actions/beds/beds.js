'use server'

import { createClient } from '../../utils/supabase/server'

export async function createBed(formData) {
  const supabase = await createClient()
  
  // Validate form data
  if (!formData.bedNumber || !formData.bedType || !formData.ward || !formData.floor) {
    return { 
      success: false, 
      error: 'Missing required fields' 
    }
  }

  try {
    // Check if bed number already exists
    const { data: existingBed, error: checkError } = await supabase
      .from('beds')
      .select('id')
      .eq('bed_number', formData.bedNumber)
      .maybeSingle()

    if (checkError) throw checkError
    if (existingBed) {
      throw new Error('Bed with this number already exists')
    }

    const { data, error } = await supabase
      .from('beds')
      .insert({
        bed_number: formData.bedNumber,
        bed_type: formData.bedType,
        ward: formData.ward,
        floor: formData.floor,
        capacity: parseInt(formData.capacity) || 1,
        charge: parseFloat(formData.charge) || 0,
        description: formData.description,
        status: formData.status || 'active'
      })
      .select()
      .single()

    if (error) throw error
    console.log('Bed created successfully:', data)

    return { 
      success: true, 
      data 
    }
  } catch (error) {
    console.error('Error creating bed:', error)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

export async function updateBed(id, formData) {
  const supabase = await createClient()
  try {
    // Check if bed is assigned before allowing update
    const { count, error: checkError } = await supabase
      .from('bed_assigned')
      .select('*', { count: 'exact', head: true })
      .eq('bed_id', id)
      .eq('status', 'active')

    if (checkError) throw checkError
    if (count > 0) {
      throw new Error('Cannot update bed that is currently assigned to a patient')
    }

    const { data, error } = await supabase
      .from('beds')
      .update({
        bed_number: formData.bedNumber,
        bed_type: formData.bedType,
        ward: formData.ward,
        floor: formData.floor,
        capacity: parseInt(formData.capacity) || 1,
        charge: parseFloat(formData.charge) || 0,
        description: formData.description,
        status: formData.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error updating bed:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteBed(id) {
  const supabase = await createClient()
  try {
    // First check if the bed is assigned to any patient
    const { count, error: checkError } = await supabase
      .from('bed_assigned')
      .select('*', { count: 'exact', head: true })
      .eq('bed_id', id)
      .eq('status', 'active')

    if (checkError) throw checkError
    if (count > 0) {
      throw new Error('Cannot delete bed that is currently assigned to a patient')
    }

    const { error } = await supabase
      .from('beds')
      .delete()
      .eq('id', id)

    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting bed:', error)
    return { success: false, error: error.message }
  }
}

export async function getBeds() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('beds')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching beds:', error)
    return { success: false, error: error.message }
  }
}

export async function getBedById(id) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('beds')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching bed by ID:', error)
    return { success: false, error: error.message }
  }
}

export async function getAvailableBeds() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('beds')
      .select('*')
      .eq('status', 'active')
      .order('bed_number', { ascending: true })

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching available beds:', error)
    return { success: false, error: error.message }
  }
}