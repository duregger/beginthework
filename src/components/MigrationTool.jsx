import React, { useState } from 'react'
import { migrateSeason1Episodes } from '../utils/migrateSeason1'
import './MigrationTool.css'

const MigrationTool = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleMigration = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const migrationResult = await migrateSeason1Episodes()
      setResult(migrationResult)
    } catch (error) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="migration-overlay">
      <div className="migration-modal">
        <div className="migration-header">
          <h2>Migrate Season 1 Episodes</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="migration-content">
          <div className="migration-info">
            <h3>What this will do:</h3>
            <ul>
              <li>Import all 10 Season 1 episodes from the original HTML</li>
              <li>Add them to Firebase Firestore</li>
              <li>Make them editable through the admin interface</li>
              <li>Preserve all existing audio/image URLs</li>
            </ul>
            
            <div className="episode-list">
              <h4>Episodes to be imported:</h4>
              <ol>
                <li>Go Win! with Heady Coleman (Ep. 8)</li>
                <li>A Conversation with Jeremy Gardner (Ep. 7)</li>
                <li>Life is not a marathon... (Ep. 6)</li>
                <li>So, you want to build a brand? (Ep. 5)</li>
                <li>A Conversation with Studio DeWalt (Ep. 4)</li>
                <li>A Conversation with Andy Braner (Ep. 3)</li>
                <li>A Conversation with Todd Smith (Ep. 2)</li>
                <li>A Conversation with Ben Nockels (Ep. 1)</li>
                <li>An introduction to BEGIN the Podcast (Intro)</li>
              </ol>
            </div>
          </div>

          {result && (
            <div className={`migration-result ${result.success ? 'success' : 'error'}`}>
              {result.success ? (
                <div>
                  <h4>✅ Migration Successful!</h4>
                  <p>Successfully imported {result.count} out of {result.total} episodes to Firebase.</p>
                  {result.count < result.total && (
                    <p>Some episodes may have failed to import. Check the console for details.</p>
                  )}
                  <p>You can now edit them through the admin interface.</p>
                </div>
              ) : (
                <div>
                  <h4>❌ Migration Failed</h4>
                  <p>Error: {result.error}</p>
                  <p>Make sure you're logged in with a @beginthework.com email address.</p>
                </div>
              )}
            </div>
          )}

          <div className="migration-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleMigration}
              disabled={loading}
            >
              {loading ? 'Migrating...' : 'Start Migration'}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MigrationTool
