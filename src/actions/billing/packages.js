'use server'
import { createClient } from "../../utils/supabase/server";

export const getPackages = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getPackageById = async (id) => {
  const supabase = await createClient();
  try {
    // Get package data
    const { data: packageData, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single();

    if (packageError) throw packageError;

    // Get package services
    const { data: services, error: servicesError } = await supabase
      .from('package_services')
      .select('service_id, quantity, rate, services(service_name)')
      .eq('package_id', id);

    if (servicesError) throw servicesError;

    return { 
      data: { 
        ...packageData, 
        services: services.map(s => ({
          id: s.service_id,
          name: s.services.service_name,
          quantity: s.quantity,
          rate: s.rate,
          amount: s.quantity * s.rate
        }))
      }, 
      error: null 
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createPackage = async (packageData) => {
  const supabase = await createClient();
  try {
    // Start transaction
    const { data: packageResult, error: packageError } = await supabase
      .from('packages')
      .insert([{
        package_name: packageData.packageName,
        description: packageData.description,
        discount: packageData.discount,
        status: packageData.status
      }])
      .select()
      .single();

    if (packageError) throw packageError;

    // Insert package services if they exist
    if (packageData.services && packageData.services.length > 0) {
      const servicesToInsert = packageData.services.map(service => ({
        package_id: packageResult.id,
        service_id: service.id,
        quantity: service.quantity,
        rate: service.rate
      }));

      const { error: servicesError } = await supabase
        .from('package_services')
        .insert(servicesToInsert);

      if (servicesError) throw servicesError;
    }

    return { data: packageResult, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updatePackage = async (id, packageData) => {
  const supabase = await createClient();
  try {
    // Update package
    const { data: packageResult, error: packageError } = await supabase
      .from('packages')
      .update({
        package_name: packageData.packageName,
        description: packageData.description,
        discount: packageData.discount,
        status: packageData.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (packageError) throw packageError;

    // Delete existing package services
    const { error: deleteError } = await supabase
      .from('package_services')
      .delete()
      .eq('package_id', id);

    if (deleteError) throw deleteError;

    // Insert new package services if they exist
    if (packageData.services && packageData.services.length > 0) {
      const servicesToInsert = packageData.services.map(service => ({
        package_id: id,
        service_id: service.id,
        quantity: service.quantity,
        rate: service.rate
      }));

      const { error: servicesError } = await supabase
        .from('package_services')
        .insert(servicesToInsert);

      if (servicesError) throw servicesError;
    }

    return { data: packageResult, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deletePackage = async (id) => {
  const supabase = await createClient();
  try {
    // Package services will be deleted automatically due to ON DELETE CASCADE
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};