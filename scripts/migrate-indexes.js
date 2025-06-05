#!/usr/bin/env node

/**
 * MongoDB Index Migration Script for Glass Bead Game
 * 
 * Run this script in production to add database indexes for performance optimization.
 * 
 * Usage:
 *   node migrate-indexes.js
 * 
 * Or with custom MongoDB URI:
 *   MONGODB_URI=mongodb://your-uri node migrate-indexes.js
 */

const { MongoClient } = require('mongodb');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/glass-bead-game';
const DATABASE_NAME = process.env.DATABASE_NAME || 'glass-bead-game';
const COLLECTION_NAME = 'games';

async function createIndexes() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    console.log('📊 Creating indexes...');
    
    // Index for sorting by creation date (most common query)
    await collection.createIndex({ createdAt: -1 }, {
      name: 'createdAt_desc',
      background: true
    });
    console.log('✅ Created index: createdAt_desc');
    
    // Text index for search functionality
    await collection.createIndex(
      { 
        title: 'text', 
        pseudonym: 'text', 
        commentary: 'text' 
      }, 
      {
        name: 'search_text',
        background: true,
        weights: {
          title: 10,      // Title matches are most important
          pseudonym: 5,   // Author matches are medium importance
          commentary: 1   // Commentary matches are lowest weight
        }
      }
    );
    console.log('✅ Created index: search_text');
    
    // Compound index for pseudonym + date (for author-specific queries)
    await collection.createIndex({ pseudonym: 1, createdAt: -1 }, {
      name: 'pseudonym_createdAt',
      background: true
    });
    console.log('✅ Created index: pseudonym_createdAt');
    
    // Index for title lookups (exact matches, case sensitive)
    await collection.createIndex({ title: 1 }, {
      name: 'title_asc',
      background: true
    });
    console.log('✅ Created index: title_asc');
    
    // Verify indexes were created
    console.log('\n📋 Current indexes:');
    const indexes = await collection.listIndexes().toArray();
    indexes.forEach(index => {
      console.log(`   - ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    console.log('\n🎉 Index migration completed successfully!');
    
    // Optional: Show collection stats
    const stats = await db.command({ collStats: COLLECTION_NAME });
    console.log(`📈 Collection stats: ${stats.count} documents, ${Math.round(stats.storageSize / 1024)} KB`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔐 Database connection closed');
  }
}

// Handle script execution
if (require.main === module) {
  console.log('🚀 Starting Glass Bead Game index migration...\n');
  createIndexes()
    .then(() => {
      console.log('\n✨ Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { createIndexes };
