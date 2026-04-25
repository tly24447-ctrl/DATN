'use server';

import { AppProviders } from "@/src/provider/provider";

export async function validateVoucherAction(code: string) {
  try {
    const vouchers = (await AppProviders.SearchVouchersUseCase.execute(code)).data;
    const voucher = vouchers.find(v => v.code.toLowerCase() === code.toLowerCase());

    if (!voucher) {
      return { success: false, message: "Voucher code not found." };
    }

    const now = new Date();
    // todo fix this ifs
    // 1. Check if the voucher is manually disabled
    console.log("now", now);
    if (!voucher.isActive) {
      return { success: false, message: "This voucher is currently inactive." };
    }

    // 2. Check if the voucher has started yet
    if (voucher.startDate && new Date(voucher.startDate) > now) {
      return { success: false, message: "This voucher is not yet active." };
    }

    // 3. Check if the voucher has expired
    if (voucher.expirationDate && new Date(voucher.expirationDate) < now) {
      return { success: false, message: "This voucher has expired." };
    }

    // 4. Check if usage limits have been reached
    const usedCount = voucher.usedCount || 0;
    if (voucher.maxUses !== undefined && usedCount >= voucher.maxUses) {
      return { success: false, message: "This voucher has reached its usage limit." };
    }

    // Everything passed
    return { 
      success: true, 
      voucher: JSON.parse(JSON.stringify(voucher)) 
    };

  } catch (error) {
    console.error("Error validating voucher:", error);
    return { success: false, message: "An error occurred while validating." };
  }
}