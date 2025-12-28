# GitHub Metrics Setup Guide

This guide will help you set up the GitHub metrics workflow to include **all private repositories** from your personal account and all organizations.

## Step 1: Create a Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `GitHub Metrics Token`
4. Set expiration: **No expiration** (or your preference)
5. Select the following scopes:

   **Required scopes:**
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership, read org projects)
   - `read:user` (Read ALL user profile data)
   - `read:project` (Read access to projects)

6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)

## Step 2: Add Token as Repository Secret

1. Go to your `JayeshKakkad-Rotoclear` repository on GitHub
2. Click **Settings** (repository settings, not your account)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **"New repository secret"**
5. Name: `METRICS_TOKEN`
6. Value: Paste the token you copied in Step 1
7. Click **"Add secret"**

## Step 3: Enable Workflow Permissions

1. In your repository, go to **Settings** → **Actions** → **General**
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **"Save"**

## Step 4: Trigger the Workflow

1. Go to **Actions** tab in your repository
2. Click **"GitHub Metrics"** workflow on the left
3. Click **"Run workflow"** → **"Run workflow"** (green button)
4. Wait 1-2 minutes for it to complete
5. You should see a new commit with `github-metrics.svg`

## Step 5: Verify

Once the workflow completes:
- A new file `github-metrics.svg` will appear in your repo root
- The README will automatically display it
- Metrics will include **all private repos** from:
  - Your personal account
  - All organizations you're a member of
  - All collaborator repos

## Automatic Updates

The workflow runs:
- Every 12 hours (automatically)
- On every push to `main` branch
- Manually via Actions tab

## Troubleshooting

**Workflow fails with "Resource not accessible by integration":**
- Check Step 3 - ensure workflow permissions are set to "Read and write"

**Metrics don't show private org repos:**
- Verify the token has `repo` and `read:org` scopes
- Make sure you're actually a member of the organization
- Organization may have restricted token access - check org settings

**Token expired:**
- Generate a new token with same scopes
- Update the `METRICS_TOKEN` secret in repository settings

## What Gets Tracked

With this setup, metrics will show:
- All commits (public + private, personal + org)
- All repositories you own, collaborate on, or are org member of
- Language statistics from all accessible repos
- Notable contributions to organizations
- Detailed activity over last 14 days
- Achievements and milestones
- Forks and collaborations

## Privacy Notes

- The metrics SVG is generated and committed to **this public repo**
- Private repo **names** will be visible in the SVG
- Private code content is **not** exposed
- If you want to hide private repo names, add them to `repositories_skipped` in the workflow file
