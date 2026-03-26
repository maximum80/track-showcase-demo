import React from 'react'
import { Card } from '../../components/ui'

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <Card.Body>
          <h2 className="text-section-title text-neutral-900 mb-2">Settings</h2>
          <p className="text-body text-neutral-500">Configure your application settings here.</p>
        </Card.Body>
      </Card>
    </div>
  )
}
