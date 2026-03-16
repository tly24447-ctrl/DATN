'use client';

import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import WebSettingsForm from '@/src/presentation/components/admin/web-setting/WebSettingsForm';
import { AppProviders } from '@/src/provider/provider';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

const WebSettingsPage = () => {
  const [settings, setSettings] = useState<WebSettingEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await AppProviders.GetWebSettingUseCase.execute();
      console.log("WebSettingsPage data", data);
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (data: Partial<WebSettingEntity>) => {
    setIsSaving(true);
    try {
      // Logic handles create vs update internally based on singleton pattern
      await AppProviders.UpdateWebSettingUseCase.execute(data);
      alert("Settings updated successfully!");
      fetchSettings();
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Error updating settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-slate-900">Website Configuration</h1>
        </div>
        <p className="text-sm text-slate-500">
          Manage your global branding, contact details, and site-wide status.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <WebSettingsForm 
          initialData={settings} 
          onSave={handleSave} 
          isSaving={isSaving} 
        />
      </div>
    </div>
  );
};

export default WebSettingsPage;