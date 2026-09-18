import Swal from 'sweetalert2'

export function useSwal() {
  const baseOptions = {
    customClass: {
      popup: 'rounded-xl shadow-lg border border-neutral-200',
      title: 'text-base font-semibold text-neutral-900',
      htmlContainer: 'text-sm text-neutral-600',
      confirmButton: 'rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
      cancelButton: 'rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 focus:ring-offset-2 mr-2 cursor-pointer',
    },
    buttonsStyling: false,
  }

  async function confirm(
    message: string,
    title: string = 'Xác nhận',
  ): Promise<boolean> {
    const result = await Swal.fire({
      ...baseOptions,
      icon: 'warning',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Huỷ',
      reverseButtons: true,
      focusCancel: true,
    })
    return result.isConfirmed
  }

  async function alert(message: string, title: string = 'Thông báo'): Promise<void> {
    await Swal.fire({
      ...baseOptions,
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'Đóng',
    })
  }

  async function error(message: string, title: string = 'Có lỗi xảy ra'): Promise<void> {
    await Swal.fire({
      ...baseOptions,
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'Đóng',
    })
  }

  async function success(message: string, title: string = 'Thành công'): Promise<void> {
    await Swal.fire({
      ...baseOptions,
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'Đóng',
    })
  }

  return {
    confirm,
    alert,
    error,
    success,
  }
}
