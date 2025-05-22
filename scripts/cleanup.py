import os
import sys
import psycopg2
from datetime import datetime, timedelta
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load environment variables
load_dotenv()

def get_db_connection():
    """Create a database connection."""
    try:
        # Parse the DATABASE_URL
        url = urlparse(os.getenv('DATABASE_URL'))

        # Extract connection parameters
        dbname = url.path[1:]  # Remove leading slash
        user = url.username
        password = url.password
        host = url.hostname
        port = url.port or 5432

        # Connect without pgbouncer parameters
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        return conn
    except Exception as e:
        print(f"[{datetime.now().isoformat()}] Error connecting to database: {e}")
        sys.exit(1)

def cleanup_low_accuracy_disruptions(conn):
    """Delete disruptions with accuracy <= -10."""
    try:
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "Entry"
                WHERE votes <= -10
                RETURNING id
            """)
            count = cur.rowcount
            conn.commit()
            print(f"[{datetime.now().isoformat()}] Cleaned up {count} low accuracy disruptions")
            return True, count
    except Exception as e:
        print(f"[{datetime.now().isoformat()}] Error cleaning up low accuracy disruptions: {e}")
        conn.rollback()
        return False, 0

def cleanup_old_disruptions(conn):
    """Delete disruptions older than 4 hours."""
    try:
        four_hours_ago = datetime.now() - timedelta(hours=4)
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "Entry"
                WHERE "updatedAt" < %s
                RETURNING id
            """, (four_hours_ago,))
            count = cur.rowcount
            conn.commit()
            print(f"[{datetime.now().isoformat()}] Cleaned up {count} old disruptions")
            return True, count
    except Exception as e:
        print(f"[{datetime.now().isoformat()}] Error cleaning up old disruptions: {e}")
        conn.rollback()
        return False, 0

def main():
    """Main function to run cleanup operations."""
    conn = get_db_connection()
    try:
        # Run both cleanup operations
        low_accuracy_success, low_accuracy_count = cleanup_low_accuracy_disruptions(conn)
        old_success, old_count = cleanup_old_disruptions(conn)

        if not low_accuracy_success or not old_success:
            print("Some cleanup operations failed")
            sys.exit(1)

        print(f"Cleanup completed successfully. Removed {low_accuracy_count + old_count} disruptions total.")
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    main()
