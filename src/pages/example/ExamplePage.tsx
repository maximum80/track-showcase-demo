import React from 'react'
import { Button, Badge, Card } from '../../components/ui'
import { usePanelStack } from '../../components/layout/PanelStack'

export function ExamplePage() {
  const { push } = usePanelStack()

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <Card.Body>
          <h2 className="text-section-title text-neutral-900 mb-4">UI Components</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="muted">Muted</Badge>
          </div>
          <Button
            variant="secondary"
            onClick={() => push({
              id: 'example-panel',
              title: 'Example Panel',
              titleJa: 'サンプルパネル',
              content: (
                <div className="p-6">
                  <p className="text-body text-neutral-700">This is the panel stack in action.</p>
                </div>
              )
            })}
          >
            Open Detail Panel
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}
