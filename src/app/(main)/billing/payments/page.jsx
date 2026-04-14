'use client'

import { useState, useEffect } from "react"
import { Tabs } from "./Tabs"
import { BillForm } from "./BillForm"
import { BillList } from "./BillList"
import { AdvancePaymentForm } from "./AdvancePaymentForm"
import { AdvancePaymentList } from "./AdvancePaymentList"
import { createService, updateService, deleteService, getServices, getServiceById } from '../../../../actions/billing/services'
import { createPackage, updatePackage, deletePackage, getPackages, getPackageById } from '../../../../actions/billing/packages'
import { createBill, updateBill, deleteBill, getBills, getBillById, getBillReports } from '../../../../actions/billing/bills'
import { createAdvancePayment, updateAdvancePayment, deleteAdvancePayment, getAdvancePayments, getAdvancePaymentById } from '../../../../actions/billing/advance-payments'
import Toast from "../../../../components/Toast"

export default function BillingManagementPage() {
  const [activeTab, setActiveTab] = useState("add-bill")
  const [patients, setPatients] = useState([])
  const [services, setServices] = useState([])
  const [packages, setPackages] = useState([])
  const [bills, setBills] = useState([])
  const [advancePayments, setAdvancePayments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  })

  // Initial data fetch
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      const [
        servicesRes, 
        packagesRes, 
        billsRes, 
        paymentsRes
      ] = await Promise.all([
        getServices(),
        getPackages(),
        getBills(),
        getAdvancePayments()
      ])

      if (servicesRes.error) throw new Error(servicesRes.error)
      if (packagesRes.error) throw new Error(packagesRes.error)
      if (billsRes.error) throw new Error(billsRes.error)
      if (paymentsRes.error) throw new Error(paymentsRes.error)

      setServices(servicesRes.data || [])
      setPackages(packagesRes.data || [])
      setBills(billsRes.data || [])
      setAdvancePayments(paymentsRes.data || [])
    } catch (error) {
      setToast({
        show: true,
        message: "Failed to fetch data: " + error.message,
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generic form submission handler
  const handleSubmit = async (e, submissionData, formType) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let result
      switch (formType) {
        case "service":
          if (editingId) {
            result = await updateService(editingId, submissionData)
          } else {
            result = await createService(submissionData)
          }
          break
        case "package":
          if (editingId) {
            result = await updatePackage(editingId, submissionData)
          } else {
            result = await createPackage(submissionData)
          }
          break
        case "bill":
          if (editingId) {
            result = await updateBill(editingId, submissionData)
          } else {
            result = await createBill(submissionData)
          }
          break
        case "advancePayment":
          if (editingId) {
            result = await updateAdvancePayment(editingId, submissionData)
          } else {
            result = await createAdvancePayment(submissionData)
          }
          break
        default:
          throw new Error("Invalid form type")
      }

      if (result.error) throw new Error(result.error)

      setToast({
        show: true,
        message: `Record ${editingId ? 'updated' : 'created'} successfully!`,
        type: "success"
      })

      // Reset form and fetch fresh data
      setEditingId(null)
      await fetchAllData()

      // Switch to appropriate list view after successful submission
      switch (formType) {
        case "service":
          setActiveTab("service-list")
          break
        case "package":
          setActiveTab("package-list")
          break
        case "bill":
          setActiveTab("bill-list")
          break
        case "advancePayment":
          setActiveTab("advance-payment-list")
          break
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'An error occurred. Please try again.',
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generic edit handler
  const handleEdit = async (id, formType) => {
    setIsLoading(true)
    try {
      let result
      switch (formType) {
        case "service":
          result = await getServiceById(id)
          setActiveTab("add-service")
          break
        case "package":
          result = await getPackageById(id)
          setActiveTab("add-package")
          break
        case "bill":
          result = await getBillById(id)
          setActiveTab("add-bill")
          break
        case "advancePayment":
          result = await getAdvancePaymentById(id)
          setActiveTab("add-advance-payment")
          break
        default:
          throw new Error("Invalid form type")
      }

      if (result.error) throw new Error(result.error)

      setEditingId(id)
      setToast({
        show: true,
        message: "Record loaded for editing",
        type: "success"
      })
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'Failed to load record for editing',
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generic delete handler
  const handleDelete = async (id, formType) => {
    if (!confirm("Are you sure you want to delete this record?")) return

    setIsLoading(true)
    try {
      let result
      switch (formType) {
        case "service":
          result = await deleteService(id)
          break
        case "package":
          result = await deletePackage(id)
          break
        case "bill":
          result = await deleteBill(id)
          break
        case "advancePayment":
          result = await deleteAdvancePayment(id)
          break
        default:
          throw new Error("Invalid form type")
      }

      if (result.error) throw new Error(result.error)

      setToast({
        show: true,
        message: "Record deleted successfully!",
        type: "success"
      })

      await fetchAllData()
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'Failed to delete record',
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Reports filter handler
  const handleFilterReports = async (startDate, endDate) => {
    setIsLoading(true)
    try {
      const { data, error } = await getBillReports(startDate, endDate)
      if (error) throw new Error(error)

      setBills(data || [])
      setToast({
        show: true,
        message: `Filtered ${data.length} records`,
        type: "success"
      })
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'Failed to filter reports',
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Render the appropriate form/list based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "add-bill":
        return (
          <BillForm
            initialFormData={editingId ? bills.find(b => b.id === editingId) : null}
            services={services}
            packages={packages}
            handleSubmit={(e, data) => handleSubmit(e, data, "bill")}
            isEditing={!!editingId}
            isLoading={isLoading}
          />
        )
      case "bill-list":
        return (
          <BillList
            bills={bills}
            onEdit={(id) => handleEdit(id, "bill")}
            onDelete={(id) => handleDelete(id, "bill")}
            isLoading={isLoading}
          />
        )
      case "add-advance-payment":
        return (
          <AdvancePaymentForm
            initialFormData={editingId ? advancePayments.find(p => p.id === editingId) : null}
            bills={bills}
            handleSubmit={(e, data) => handleSubmit(e, data, "advancePayment")}
            isEditing={!!editingId}
            isLoading={isLoading}
          />
        )
      case "advance-payment-list":
        return (
          <AdvancePaymentList
            payments={advancePayments}
            onEdit={(id) => handleEdit(id, "advancePayment")}
            onDelete={(id) => handleDelete(id, "advancePayment")}
            isLoading={isLoading}
          />
        )
      default:
        return (
          <BillForm
            initialFormData={editingId ? bills.find(b => b.id === editingId) : null}
            services={services}
            packages={packages}
            handleSubmit={(e, data) => handleSubmit(e, data, "bill")}
            isEditing={!!editingId}
            isLoading={isLoading}
          />
        )
    }
  }

  return (
    <div className="p-2 md:p-2 max-w-8xl space-y-6">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </div>
  )
}