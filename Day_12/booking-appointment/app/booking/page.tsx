// // "use client";

// // import BookingForm from "@/app/components/booking/BookingForm";

// // export default function BookingsPage() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4">
// //       <div className="max-w-3xl mx-auto py-16">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl font-bold text-slate-900">Đặt lịch khám</h1>
// //           <p className="text-slate-600 mt-3 text-lg">
// //             Hoàn tất thông tin bên dưới để giữ lịch khám
// //           </p>
// //         </div>

// //         {/* Form wrapper */}
// //         <div className="relative">
// //           {/* glow */}
// //           <div className="absolute inset-0 -z-10 rounded-[32px] bg-blue-200/40 blur-3xl" />

// //           <BookingForm />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import {
//   Calendar,
//   User,
//   Phone,
//   Stethoscope,
//   Building2,
//   Clock,
//   FileText,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
// } from "lucide-react";

// interface BookingFormState {
//   name: string;
//   phone: string;
//   service?: string;
//   clinic?: string;
//   gender?: string;
//   age?: string;
//   appointmentDate?: string;
//   symptoms?: string;
// }

// function useBookingForm() {
//   const router = useRouter();
//   const { status } = useSession();

//   const [form, setForm] = useState<BookingFormState>({
//     name: "",
//     phone: "",
//     service: "",
//     clinic: "",
//     gender: "",
//     age: "",
//     appointmentDate: "",
//     symptoms: "",
//   });

//   const [errors, setErrors] = useState<Partial<BookingFormState>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   function update<K extends keyof BookingFormState>(
//     key: K,
//     value: BookingFormState[K]
//   ) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//   }

//   function validateForm(): boolean {
//     const newErrors: Partial<BookingFormState> = {};

//     if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
//     if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
//     else if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ""))) {
//       newErrors.phone = "Số điện thoại không hợp lệ";
//     }
//     if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
//     if (!form.age) newErrors.age = "Vui lòng nhập tuổi";
//     if (!form.service) newErrors.service = "Vui lòng chọn dịch vụ";
//     if (!form.clinic) newErrors.clinic = "Vui lòng chọn phòng khám";
//     if (!form.appointmentDate)
//       newErrors.appointmentDate = "Vui lòng chọn ngày giờ";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }

//   async function submit() {
//     if (status !== "authenticated") {
//       router.push("/login?next=/bookings");
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           phone: form.phone,
//           gender: form.gender,
//           age: form.age,
//           service_id: form.service,
//           clinic_id: form.clinic,
//           appointment_date: form.appointmentDate,
//           symptoms: form.symptoms,
//           amount: 150000,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Không thể tạo lịch hẹn");
//       }

//       const data = await res.json();
//       router.push(`/payment?bookingId=${data.bookingId}`);
//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return { form, update, submit, errors, isSubmitting };
// }

// function BookingForm() {
//   const { form, update, submit, errors, isSubmitting } = useBookingForm();
//   const [services, setServices] = useState<{ id: string; name: string }[]>([]);
//   const [clinics, setClinics] = useState<{ id: string; name: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { status } = useSession();

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [servicesRes, clinicsRes] = await Promise.all([
//           fetch("/api/services"),
//           fetch("/api/clinics"),
//         ]);

//         setServices(await servicesRes.json());
//         setClinics(await clinicsRes.json());
//       } catch (error) {
//         console.error("LOAD DATA ERROR:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12">
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//           <p className="text-slate-600">Đang tải thông tin...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
//         <h2 className="text-2xl font-bold text-white">Thông tin đặt lịch</h2>
//         <p className="text-blue-100 mt-1 flex items-center gap-2">
//           <CheckCircle2 className="w-4 h-4" />
//           Thông tin của bạn được bảo mật tuyệt đối
//         </p>
//       </div>

//       <div className="p-8 space-y-6">
//         {/* Personal Information Section */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
//             <User className="w-5 h-5 text-blue-600" />
//             Thông tin cá nhân
//           </h3>

//           <div className="grid grid-cols-1 gap-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Họ và tên <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={form.name}
//                 onChange={(e) => update("name", e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                   errors.name ? "border-red-500 bg-red-50" : "border-slate-300"
//                 }`}
//                 placeholder="Nguyễn Văn A"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Gender and Age */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Giới tính <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={form.gender}
//                   onChange={(e) => update("gender", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                     errors.gender
//                       ? "border-red-500 bg-red-50"
//                       : "border-slate-300"
//                   }`}
//                 >
//                   <option value="">Chọn giới tính</option>
//                   <option value="male">Nam</option>
//                   <option value="female">Nữ</option>
//                   <option value="other">Khác</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.gender}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Tuổi <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   value={form.age}
//                   onChange={(e) => update("age", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                     errors.age ? "border-red-500 bg-red-50" : "border-slate-300"
//                   }`}
//                   placeholder="25"
//                   min="1"
//                   max="120"
//                 />
//                 {errors.age && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.age}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-blue-600" />
//                 Số điện thoại <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 value={form.phone}
//                 onChange={(e) => update("phone", e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                   errors.phone ? "border-red-500 bg-red-50" : "border-slate-300"
//                 }`}
//                 placeholder="0901234567"
//               />
//               {errors.phone && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.phone}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-slate-200 my-6"></div>

//         {/* Appointment Details Section */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-blue-600" />
//             Chi tiết lịch hẹn
//           </h3>

//           <div className="grid grid-cols-1 gap-4">
//             {/* Service and Clinic */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
//                   <Stethoscope className="w-4 h-4 text-blue-600" />
//                   Dịch vụ <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={form.service}
//                   onChange={(e) => update("service", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                     errors.service
//                       ? "border-red-500 bg-red-50"
//                       : "border-slate-300"
//                   }`}
//                 >
//                   <option value="">Chọn dịch vụ</option>
//                   {services.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.service && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.service}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
//                   <Building2 className="w-4 h-4 text-blue-600" />
//                   Phòng khám <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={form.clinic}
//                   onChange={(e) => update("clinic", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                     errors.clinic
//                       ? "border-red-500 bg-red-50"
//                       : "border-slate-300"
//                   }`}
//                 >
//                   <option value="">Chọn phòng khám</option>
//                   {clinics.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.clinic && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.clinic}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Appointment Date */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-blue-600" />
//                 Ngày & giờ muốn khám <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="datetime-local"
//                 value={form.appointmentDate}
//                 onChange={(e) => update("appointmentDate", e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                   errors.appointmentDate
//                     ? "border-red-500 bg-red-50"
//                     : "border-slate-300"
//                 }`}
//               />
//               {errors.appointmentDate && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.appointmentDate}
//                 </p>
//               )}
//             </div>

//             {/* Symptoms */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" />
//                 Mô tả triệu chứng & ghi chú
//               </label>
//               <textarea
//                 value={form.symptoms}
//                 onChange={(e) => update("symptoms", e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
//                 placeholder="Mô tả triệu chứng, tiền sử bệnh, hoặc ghi chú cho bác sĩ..."
//               />
//               <p className="mt-1 text-xs text-slate-500">
//                 Thông tin này giúp bác sĩ chuẩn bị tốt hơn cho buổi khám
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Price Summary */}
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-slate-600 mb-1">Phí giữ lịch</p>
//               <p className="text-xs text-slate-500">
//                 Sẽ được trừ vào tổng chi phí khám
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-3xl font-bold text-blue-600">150.000đ</p>
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={submit}
//           disabled={isSubmitting || status === "loading"}
//           className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
//             isSubmitting || status === "loading"
//               ? "bg-slate-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           }`}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Đang xử lý...
//             </>
//           ) : status === "loading" ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Đang kiểm tra đăng nhập...
//             </>
//           ) : (
//             <>
//               <CheckCircle2 className="w-5 h-5" />
//               Xác nhận & thanh toán
//             </>
//           )}
//         </button>

//         {status === "unauthenticated" && (
//           <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm font-medium text-amber-900">
//                 Yêu cầu đăng nhập
//               </p>
//               <p className="text-xs text-amber-700 mt-1">
//                 Bạn cần đăng nhập để đặt lịch khám. Hệ thống sẽ chuyển hướng đến
//                 trang đăng nhập.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Security Notice */}
//         <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
//           <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//           <div className="text-xs text-slate-600 leading-relaxed">
//             <p className="font-medium text-slate-700 mb-1">Cam kết bảo mật</p>
//             <p>
//               Thông tin cá nhân của bạn được mã hóa và bảo mật theo tiêu chuẩn
//               quốc tế. Chúng tôi không chia sẻ dữ liệu với bên thứ ba.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Bookings Page Component
// export default function BookingsPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-12">
//       <div className="max-w-4xl mx-auto">
//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
//             <Calendar className="w-4 h-4" />
//             <span>Đặt lịch trực tuyến</span>
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
//             Đặt lịch khám bệnh
//           </h1>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Hoàn tất thông tin bên dưới để giữ lịch khám. Chúng tôi sẽ xác nhận
//             lịch hẹn của bạn trong vòng 24 giờ.
//           </p>
//         </div>

//         {/* Form Container with Glow Effect */}
//         <div className="relative">
//           <div className="absolute inset-0 -z-10 rounded-3xl bg-blue-200/30 blur-3xl transform scale-95" />
//           <BookingForm />
//         </div>

//         {/* Additional Info */}
//         <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
//           <div className="bg-white rounded-xl p-6 shadow-md">
//             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="font-semibold text-slate-900 mb-2">
//               Xác nhận nhanh
//             </h3>
//             <p className="text-sm text-slate-600">
//               Nhận xác nhận trong vòng 24 giờ
//             </p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-md">
//             <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <CheckCircle2 className="w-6 h-6 text-green-600" />
//             </div>
//             <h3 className="font-semibold text-slate-900 mb-2">
//               An toàn & bảo mật
//             </h3>
//             <p className="text-sm text-slate-600">
//               Thông tin được mã hóa bảo mật
//             </p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-md">
//             <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <Phone className="w-6 h-6 text-purple-600" />
//             </div>
//             <h3 className="font-semibold text-slate-900 mb-2">Hỗ trợ 24/7</h3>
//             <p className="text-sm text-slate-600">Liên hệ 1900-xxxx khi cần</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import BookingForm from "@/app/components/booking/BookingForm";

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Đặt lịch khám bệnh
          </h1>
          <p className="text-lg text-slate-600 mt-3">
            Hoàn tất thông tin bên dưới để giữ lịch
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-blue-200/30 blur-3xl rounded-3xl" />
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
