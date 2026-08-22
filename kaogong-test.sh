#!/usr/bin/env bash
set -e

# Configuration
DOMAIN="kaogong.dora.im"
URL="https://$DOMAIN"
API_URL="$URL/api"

echo "============================="
echo "   Kaogong Platform Tests    "
echo "============================="
echo "Testing against $URL..."

# 1. Test Static Frontend
echo -n "1. Testing Frontend: "
FRONTEND_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $URL/)
if [ "$FRONTEND_STATUS" == "200" ]; then
  echo "✅ OK"
else
  echo "❌ FAILED (HTTP $FRONTEND_STATUS)"
  exit 1
fi

# 2. Test Admin Frontend
echo -n "2. Testing Admin UI: "
ADMIN_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $URL/admin/)
if [ "$ADMIN_STATUS" == "200" ]; then
  echo "✅ OK"
else
  echo "❌ FAILED (HTTP $ADMIN_STATUS)"
  exit 1
fi

# 3. Test Backend API (Public Endpoint)
echo -n "3. Testing Backend Public API: "
API_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $API_URL/questions)
if [ "$API_STATUS" == "200" ]; then
  echo "✅ OK"
else
  echo "❌ FAILED (HTTP $API_STATUS)"
  exit 1
fi

# 4. Test Admin Login (Requires reading password from sops)
echo -n "4. Testing Admin API Authentication: "
# Assuming this script is run on the machine, or password is provided
if [ -z "$ADMIN_PASSWORD" ]; then
  echo "⚠️ SKIP (ADMIN_PASSWORD not set)"
else
  LOGIN_RESP=$(curl -s -X POST "$API_URL/auth/admin/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"i\",\"password\":\"$ADMIN_PASSWORD\"}")

  TOKEN=$(echo $LOGIN_RESP | grep -oP '"access_token":"\K[^"]+')

  if [ -n "$TOKEN" ]; then
    echo "✅ OK (Token received)"
  else
    echo "❌ FAILED (Response: $LOGIN_RESP)"
    exit 1
  fi

  # 5. Test Authenticated Admin Action
  echo -n "5. Testing Protected Admin API: "
  PROTECTED_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" -X POST "$API_URL/questions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"content\":\"Test Question\"}")

  if [ "$PROTECTED_STATUS" == "201" ]; then
    echo "✅ OK"
  else
    echo "❌ FAILED (HTTP $PROTECTED_STATUS)"
    exit 1
  fi
fi

echo "============================="
echo "🎉 All tests passed successfully!"
