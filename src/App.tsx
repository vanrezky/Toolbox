import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AbnGenerator } from './components/tools/AbnGenerator';
import { AcnGenerator } from './components/tools/AcnGenerator';
import { UuidGenerator } from './components/tools/UuidGenerator';
import { BcryptTool } from './components/tools/BcryptTool';
import { Sha1Tool } from './components/tools/Sha1Tool';
import { Md5Tool } from './components/tools/Md5Tool';
import { JsonTools } from './components/tools/JsonTools';
import { ThumbnailGenerator } from './components/tools/ThumbnailGenerator';

export default function App() {
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (currentTool) {
      case 'abn':
        return <AbnGenerator />;
      case 'acn':
        return <AcnGenerator />;
      case 'uuid':
        return <UuidGenerator />;
      case 'bcrypt':
        return <BcryptTool />;
      case 'sha1':
        return <Sha1Tool />;
      case 'md5':
        return <Md5Tool />;
      case 'json':
        return <JsonTools />;
      case 'thumbnail':
        return <ThumbnailGenerator />;
      default:
        return <Dashboard onSelectTool={setCurrentTool} />;
    }
  };

  const getTitle = () => {
    switch (currentTool) {
      case 'abn':
        return 'ABN Generator';
      case 'acn':
        return 'ACN Generator';
      case 'uuid':
        return 'UUID Generator';
      case 'bcrypt':
        return 'Bcrypt Tool';
      case 'sha1':
        return 'SHA1 Generator';
      case 'md5':
        return 'MD5 Tool';
      case 'json':
        return 'JSON Tools';
      case 'thumbnail':
        return 'Thumbnail Generator';
      default:
        return 'DevTools';
    }
  };

  return (
    <Layout
      title={getTitle()}
      onBack={currentTool ? () => setCurrentTool(null) : undefined}
    >
      {renderTool()}
    </Layout>
  );
}
