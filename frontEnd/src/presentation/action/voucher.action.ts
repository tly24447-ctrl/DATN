'use server';

import { AppProviders } from "@/src/provider/provider";

export async function validateVoucherAction(code: string) {
  try {
    // We use SearchVouchersUseCase to find the voucher by code
    const vouchers = (await AppProviders.SearchVouchersUseCase.execute(code)).data;
    
    // Exact match check
    const voucher = vouchers.find(v => v.code.toLowerCase() === code.toLowerCase());

    if (!voucher) {
      return { success: false, message: "Voucher code not found." };
    }

    // Optional: Check expiry or usage limits if your Entity has those fields
    if (voucher.expirationDate && new Date(voucher.expirationDate) < new Date() && (voucher.usedCount || 0) >= voucher.maxUses) {
      return { success: false, message: "Voucher has expired." };
    }

    return { success: true, voucher: JSON.parse(JSON.stringify(voucher)) };
  } catch (error) {
    console.error("Error validating voucher:", error);
    return { success: false, message: "An error occurred while validating." };
  }
}