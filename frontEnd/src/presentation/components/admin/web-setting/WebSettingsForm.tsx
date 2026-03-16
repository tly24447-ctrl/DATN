'use client';

import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import * as Icons from 'lucide-react';
import { Mail, Save, ToggleRight, Type, Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  initialData: WebSettingEntity | null;
  onSave: (data: Partial<WebSettingEntity>) => void;
  isSaving: boolean;
}

const WebSettingsForm: React.FC<Props> = ({ initialData, onSave, isSaving }) => {
  const [formData, setFormData] = useState<Partial<WebSettingEntity>>(initialData || {});

  // Dynamic Lucide Icon Preview
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconPreview = (formData.headerIcon && (Icons as any)[formData.headerIcon]) 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (Icons as any)[formData.headerIcon] 
    : Icons.HelpCircle;

  // Handle File to Base64 Conversion
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit for Base64 to keep DB efficient
        alert("Logo file is too large. Please select an image under 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData({ ...formData, logoUrl: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Type size={18} className="text-blue-500" /> General Branding
          </h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Website Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Website Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.webName || ''}
              onChange={(e) => setFormData({ ...formData, webName: e.target.value })}
            />
          </div>

          {/* Logo Upload (Base64) */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Website Logo</label>
            <div className="flex items-center gap-4">
              {formData.logoUrl ? (
                <div className="relative group w-20 h-20 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <Image 
                    src={formData.logoUrl} 
                    alt="Preview" 
                    fill 
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>
              ) : (
                <label className="w-20 h-20 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-400">
                  <Upload size={20} />
                  <span className="text-[10px] mt-1 font-medium">Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
              <div className="flex-1">
                <p className="text-xs text-slate-500">Upload your brand logo. Recommended size: 200x200px. Max: 1MB.</p>
                {formData.logoUrl && (
                  <span className="text-[10px] text-green-600 font-bold uppercase mt-1 inline-block">Image Loaded</span>
                )}
              </div>
            </div>
          </div>

          {/* Header Icon Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Header Icon (Lucide Name)</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. ShoppingCart, Library"
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.headerIcon || ''}
                onChange={(e) => setFormData({ ...formData, headerIcon: e.target.value })}
              />
              <div className="w-10 h-10 border rounded bg-slate-100 flex items-center justify-center text-blue-600">
                <IconPreview size={20} />
              </div>
            </div>
          </div>

          {/* Contact Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Contact Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.contactEmail || ''}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Status Sections (Kept same as previous) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <ToggleRight size={18} className="text-blue-500" /> Status & Footer
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Footer Text</label>
            <textarea
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
              value={formData.footerText || ''}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              className="w-5 h-5 accent-blue-600 cursor-pointer"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">
              Website is Active (Visible to Public)
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {isSaving ? (
             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save size={20} />
          )}
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default WebSettingsForm;