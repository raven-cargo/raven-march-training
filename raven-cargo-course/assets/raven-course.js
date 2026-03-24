(function () {
  'use strict';

  var manifest = null;
  var uploadedResources = [];
  var submissions = [];
  var COURSE_BASE = '/raven-cargo-course';

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(value) {
    if (!value) return 'Unscheduled';
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  function chipClass(label) {
    var normalized = String(label || '').toLowerCase();
    if (normalized.indexOf('async') >= 0) return 'chip-async';
    if (normalized.indexOf('safety') >= 0 || normalized.indexOf('security') >= 0) return 'chip-safety';
    if (normalized.indexOf('capstone') >= 0) return 'chip-capstone';
    return 'chip-live';
  }

  function setStatus(id, message, kind) {
    var el = byId(id);
    if (!el) return;
    el.textContent = message || '';
    el.className = 'raven-status' + (kind ? ' is-' + kind : '');
  }

  function readJson(url, options) {
    return fetch(url, options).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (payload) {
        if (!response.ok) {
          throw new Error(payload.error || payload.message || ('Request failed for ' + url));
        }
        return payload;
      });
    });
  }

  function compareByCreatedAtDesc(left, right) {
    return new Date(right.created_at || 0).getTime() - new Date(left.created_at || 0).getTime();
  }

  function compareByCreatedAtAsc(left, right) {
    return new Date(left.created_at || 0).getTime() - new Date(right.created_at || 0).getTime();
  }

  function fileExtension(value) {
    var parts = String(value || '').split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  }

  function mediaKind(item) {
    var source = String(item.file_url || item.href || item.link_url || '').toLowerCase();
    var name = String(item.file_name || item.title || '').toLowerCase();
    var type = String(item.content_type || '').toLowerCase();
    var ext = fileExtension(source || name);

    if (type.indexOf('video/') === 0 || ['mp4', 'webm', 'ogg', 'mov', 'm4v'].indexOf(ext) >= 0) return 'video';
    if (type.indexOf('image/') === 0 || ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].indexOf(ext) >= 0) return 'image';
    if (type.indexOf('audio/') === 0 || ['mp3', 'wav', 'm4a', 'aac'].indexOf(ext) >= 0) return 'audio';
    if (ext === 'pdf') return 'pdf';
    return 'file';
  }

  function fileKindLabel(item) {
    var kind = mediaKind(item);
    if (kind === 'video') return 'Video';
    if (kind === 'image') return 'Image';
    if (kind === 'audio') return 'Audio';
    if (kind === 'pdf') return 'PDF';
    return 'File';
  }

  function renderMediaPreview(item, variant) {
    var url = item.file_url || item.href || item.link_url || '';
    if (!url) return '';
    var kind = mediaKind(item);
    var isGoogleDrive = url.indexOf('drive.google.com') >= 0;
    var drivePreview = url;

    if (isGoogleDrive) {
      var fileMatch = url.match(/\/file\/d\/([^/]+)/);
      var openMatch = url.match(/[?&]id=([^&]+)/);
      var fileId = fileMatch ? fileMatch[1] : (openMatch ? openMatch[1] : '');
      if (fileId) {
        drivePreview = 'https://drive.google.com/file/d/' + fileId + '/preview';
      }
    }

    if (kind === 'video') {
      if (isGoogleDrive) {
        return '' +
          '<div class="raven-media-preview is-' + variant + '">' +
            '<iframe src="' + escapeHtml(drivePreview) + '" allow="autoplay; fullscreen" allowfullscreen loading="lazy" referrerpolicy="no-referrer"></iframe>' +
          '</div>';
      }
      return '' +
        '<div class="raven-media-preview is-' + variant + '">' +
          '<video controls preload="metadata" playsinline src="' + escapeHtml(url) + '"></video>' +
        '</div>';
    }
    if (kind === 'image') {
      return '' +
        '<div class="raven-media-preview is-' + variant + '">' +
          '<img src="' + escapeHtml(url) + '" alt="' + escapeHtml(item.title || item.file_name || 'Uploaded image') + '" loading="lazy">' +
        '</div>';
    }
    if (kind === 'audio') {
      return '' +
        '<div class="raven-media-preview is-' + variant + '">' +
          '<audio controls preload="metadata" src="' + escapeHtml(url) + '"></audio>' +
        '</div>';
    }
    return '';
  }

  function renderFileBlock(item, variant) {
    var fileUrl = item.file_url || item.href || '';
    var linkUrl = item.link_url || '';
    var fileName = item.file_name || item.title || 'Attachment';
    var description = item.description || item.notes || '';
    var preview = renderMediaPreview(item, variant);
    var actions = '';

    if (fileUrl) {
      actions += '<a class="raven-inline-link" href="' + escapeHtml(fileUrl) + '" target="_blank" rel="noreferrer">Open ' + escapeHtml(fileKindLabel(item)) + '</a>';
    }
    if (linkUrl) {
      actions += '<a class="raven-inline-link is-secondary-link" href="' + escapeHtml(linkUrl) + '" target="_blank" rel="noreferrer">Open External Link</a>';
    }

    return '' +
      '<section class="raven-file-block is-' + variant + '">' +
        '<div class="raven-file-block-head">' +
          '<div>' +
            '<div class="raven-file-label">' + escapeHtml(fileKindLabel(item)) + '</div>' +
            '<div class="raven-file-name">' + escapeHtml(fileName) + '</div>' +
          '</div>' +
          '<div class="raven-chip-row">' +
            (item.created_at ? '<span class="raven-chip">' + escapeHtml(formatDate(item.created_at)) + '</span>' : '') +
          '</div>' +
        '</div>' +
        (description ? '<p class="raven-file-description">' + escapeHtml(description) + '</p>' : '') +
        preview +
        (actions ? '<div class="raven-file-actions">' + actions + '</div>' : '') +
      '</section>';
  }

  function createUploadSession(file, kind, token) {
    return readJson('/api/raven-course/upload', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-raven-resource-token': token || ''
      },
      body: JSON.stringify({
        kind: kind,
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        fileSize: file.size || 0
      })
    });
  }

  function uploadDirect(session, file) {
    return fetch(session.uploadUrl, {
        method: 'PUT',
        headers: {
          'content-type': file.type || 'application/octet-stream'
        },
        body: file
      }).then(function (response) {
        if (response.ok) return session;
        return response.text().catch(function () { return ''; }).then(function (text) {
          throw new Error(text || 'Direct upload failed.');
        });
      });
  }

  function renderStats() {
    var host = byId('delivery-stats');
    if (!host) return;
    host.innerHTML = (manifest.deliveryStats || []).map(function (item) {
      return '' +
        '<article class="raven-stat-card">' +
          '<div class="raven-stat-value">' + escapeHtml(item.value) + '</div>' +
          '<div class="raven-stat-label">' + escapeHtml(item.label) + '</div>' +
        '</article>';
    }).join('');
  }


  function useCaseMap() {
    var map = {};
    (manifest.useCases || []).forEach(function (item) {
      map[item.id] = item;
    });
    return map;
  }

  function renderDays() {
    var host = byId('course-flow');
    if (!host) return;
    var cases = useCaseMap();

    host.innerHTML = (manifest.days || []).map(function (day) {
      var blocks = (day.blocks || []).map(function (block) {
        var useCasesHtml = (block.useCaseIds || []).map(function (id) {
          var item = cases[id];
          return item ? '<span class="raven-chip">' + escapeHtml(item.title) + '</span>' : '';
        }).join('');

        var moduleLinks = (block.modules || []).map(function (item) {
          return '' +
            '<a class="raven-block-link" href="' + escapeHtml(item.href) + '">' +
              '<span class="raven-link-type">Module ' + escapeHtml(item.id) + '</span>' +
              '<span class="raven-link-title">' + escapeHtml(item.title) + '</span>' +
            '</a>';
        }).join('');

        var labLinks = (block.labs || []).map(function (item) {
          return '' +
            '<a class="raven-block-link" href="' + escapeHtml(item.href) + '">' +
              '<span class="raven-link-type">Lab ' + escapeHtml(item.id) + '</span>' +
              '<span class="raven-link-title">' + escapeHtml(item.title) + '</span>' +
            '</a>';
        }).join('');

        return '' +
          '<details class="raven-block-card">' +
            '<summary>' +
              '<div class="raven-block-time">' + escapeHtml(block.time) + '</div>' +
              '<div>' +
                '<div class="raven-block-topic">' + escapeHtml(block.topic) + '</div>' +
                '<div class="raven-block-title">' + escapeHtml(block.title) + '</div>' +
                '<div class="raven-chip-row">' +
                  '<span class="raven-chip">' + escapeHtml(block.trainingModule) + '</span>' +
                  '<span class="raven-chip">' + escapeHtml(block.coreSkill) + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="raven-block-caret">›</div>' +
            '</summary>' +
            '<div class="raven-block-body">' +
              '<div class="raven-mini-grid">' +
                '<div class="raven-mini-card">' +
                  '<div class="raven-mini-label">Live Modules</div>' +
                  '<div class="raven-link-cluster" style="margin-top:8px;">' + moduleLinks + '</div>' +
                '</div>' +
                '<div class="raven-mini-card">' +
                  '<div class="raven-mini-label">Live Labs</div>' +
                  '<div class="raven-link-cluster" style="margin-top:8px;">' + labLinks + '</div>' +
                '</div>' +
              '</div>' +
              '<div class="raven-mini-grid">' +
                '<div class="raven-mini-card">' +
                  '<div class="raven-mini-label">Deliverables</div>' +
                  '<ul>' + (block.deliverables || []).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul>' +
                '</div>' +
                '<div class="raven-mini-card">' +
                  '<div class="raven-mini-label">Use Cases</div>' +
                  '<div class="raven-chip-row" style="margin-top:8px;">' + useCasesHtml + '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</details>';
      }).join('');

      var close = day.close || {};
      var closeout = '' +
        '<article class="raven-closeout raven-meta-card">' +
          '<div class="raven-mini-label">' + escapeHtml(close.title || '') + '</div>' +
          '<p style="margin:10px 0 0;color:var(--muted);">' + escapeHtml(close.summary || '') + '</p>' +
          '<ul>' + (close.actions || []).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul>' +
        '</article>';

      return '' +
        '<section class="raven-day">' +
          '<div class="raven-day-head">' +
            '<div class="raven-day-title">' + escapeHtml(day.label) + '</div>' +
            '<div class="raven-day-theme">' + escapeHtml(day.theme) + '</div>' +
          '</div>' +
          '<div class="raven-block-list">' + blocks + '</div>' +
          '<div style="margin-top:12px;">' + closeout + '</div>' +
        '</section>';
    }).join('');
  }

  function renderUseCases() {
    var host = byId('use-case-grid');
    if (!host) return;

    host.innerHTML = (manifest.useCases || []).map(function (item) {
      var meta = (item.meta || []).map(function (entry) {
        return '' +
          '<div class="raven-meta-row">' +
            '<span>' + escapeHtml(entry.label) + '</span>' +
            '<span>' + escapeHtml(entry.value) + '</span>' +
          '</div>';
      }).join('');

      return '' +
        '<article class="raven-usecase-card">' +
          '<div class="raven-chip-row">' +
            '<span class="raven-chip ' + chipClass(item.fit) + '">' + escapeHtml(item.fit) + '</span>' +
            '<span class="raven-chip">' + escapeHtml(item.day) + '</span>' +
            '<span class="raven-chip">' + escapeHtml(item.moduleTag) + '</span>' +
            '<span class="raven-chip">' + escapeHtml(item.labTag) + '</span>' +
          '</div>' +
          '<div class="raven-usecase-title">' + escapeHtml(item.title) + '</div>' +
          '<p>' + escapeHtml(item.description) + '</p>' +
          '<div class="raven-meta-list">' +
            '<div class="raven-meta-row"><span>Pattern</span><span>' + escapeHtml(item.pattern) + '</span></div>' +
            meta +
          '</div>' +
        '</article>';
    }).join('');
  }

  function renderSubmissionOptions() {
    var labSelect = byId('submission-lab');
    var useCaseSelect = byId('submission-use-case');
    if (!labSelect || !useCaseSelect) return;

    labSelect.innerHTML = '<option value="">Select lab</option>' + (manifest.labSequence || []).map(function (item) {
      return '<option value="' + escapeHtml(item.id) + '">Lab ' + escapeHtml(item.id) + ' — ' + escapeHtml(item.title) + '</option>';
    }).join('');

    useCaseSelect.innerHTML = '<option value="">Optional use case tag</option>' + (manifest.useCases || []).map(function (item) {
      return '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.title) + '</option>';
    }).join('');
  }

  function renderSubmissionList() {
    var host = byId('submission-list');
    if (!host) return;

    if (!submissions.length) {
      host.innerHTML = '<div class="raven-empty-state">No submissions have been posted yet. Once Supabase is connected, student uploads will populate here.</div>';
      return;
    }

    submissions = submissions.slice().sort(compareByCreatedAtDesc);

    host.innerHTML = submissions.map(function (item) {
      var title = item.name || item.submitter_name || 'Raven participant';
      var labTitle = item.lab_title || (item.lab_id ? 'Lab ' + item.lab_id : 'Submission');
      var attachmentBlock = item.file_url || item.link_url
        ? renderFileBlock({
            title: item.lab_title || item.file_name || 'Submission attachment',
            description: item.notes || '',
            file_url: item.file_url || '',
            file_name: item.file_name || '',
            link_url: item.link_url || '',
            created_at: item.created_at || '',
            content_type: item.content_type || ''
          }, 'submission')
        : '';

      return '' +
        '<article class="raven-submission-card raven-meta-card">' +
          '<div class="raven-submission-shell">' +
            '<div class="raven-submission-main">' +
              '<div class="raven-chip-row">' +
                (item.block_title ? '<span class="raven-chip">' + escapeHtml(item.block_title) + '</span>' : '') +
                (item.use_case_title ? '<span class="raven-chip">' + escapeHtml(item.use_case_title) + '</span>' : '') +
                '<span class="raven-chip submission-order">Most Recent First</span>' +
              '</div>' +
              '<div class="raven-submission-title">' + escapeHtml(title) + '</div>' +
              '<p>' + escapeHtml(labTitle) + '</p>' +
              (item.notes ? '<p style="margin-top:10px;">' + escapeHtml(item.notes) + '</p>' : '') +
              '<div class="raven-meta-list">' +
                '<div class="raven-meta-row"><span>Submitted</span><span>' + escapeHtml(formatDate(item.created_at)) + '</span></div>' +
                (item.team ? '<div class="raven-meta-row"><span>Team</span><span>' + escapeHtml(item.team) + '</span></div>' : '') +
                (item.role ? '<div class="raven-meta-row"><span>Role</span><span>' + escapeHtml(item.role) + '</span></div>' : '') +
              '</div>' +
            '</div>' +
            '<div class="raven-submission-side">' +
              (attachmentBlock || '<div class="raven-empty-attachment">No file attached. Review the external link or notes only.</div>') +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function renderResourceList() {
    var host = byId('resource-list');
    var summary = byId('resource-count-copy');
    if (!host) return;
    var uploaded = (uploadedResources || []).slice().sort(compareByCreatedAtAsc);
    var videoCount = uploaded.filter(function (item) { return mediaKind(item) === 'video'; }).length;
    var deckCount = uploaded.filter(function (item) { return mediaKind(item) === 'pdf'; }).length;

    if (summary) {
      summary.textContent = uploaded.length
        ? uploaded.length + ' uploaded resources · ' + deckCount + ' slide decks · ' + videoCount + ' videos'
        : 'Only uploaded 2-day course materials appear here for now.';
    }

    if (!uploaded.length) {
      host.innerHTML = '<div class="raven-empty-state">No 2-day course resources have been uploaded yet.</div>';
      return;
    }
    host.innerHTML =
      '<div class="raven-resource-grid">' +
        uploaded.map(function (item) {
          var kind = item.kind || 'upload';
          var href = item.href || item.file_url || item.url || item.path || '#';
          var description = item.description || item.notes || 'Uploaded Raven resource.';
          var category = item.category || item.kind || 'Course Resource';
          var external = href.indexOf('http') === 0;
          var fileBlock = renderFileBlock({
            title: item.title || item.file_name || 'Untitled resource',
            description: description,
            file_url: item.file_url || (external ? href : ''),
            file_name: item.file_name || item.title || '',
            link_url: item.link_url || '',
            href: href,
            created_at: item.created_at || '',
            content_type: item.content_type || '',
            notes: description
          }, 'resource');

          return '' +
            '<article class="raven-resource-card resource-' + escapeHtml(kind) + '">' +
              '<div class="raven-chip-row">' +
                '<span class="raven-chip">' + escapeHtml(category) + '</span>' +
                (item.created_at ? '<span class="raven-chip">' + escapeHtml(formatDate(item.created_at)) + '</span>' : '') +
              '</div>' +
              '<div class="raven-resource-title">' + escapeHtml(item.title || item.file_name || 'Untitled resource') + '</div>' +
              '<p>' + escapeHtml(description) + '</p>' +
              fileBlock +
            '</article>';
        }).join('') +
      '</div>';
  }

  function fetchSubmissions() {
    return readJson('/api/raven-course/submissions')
      .then(function (payload) {
        submissions = payload.items || [];
        renderSubmissionList();
      })
      .catch(function (error) {
        submissions = [];
        renderSubmissionList();
        setStatus('submission-status', error.message || 'Submissions failed to load.', 'error');
      });
  }

  function fetchResources() {
    return readJson('/api/raven-course/resources')
      .then(function (payload) {
        uploadedResources = payload.items || [];
        renderResourceList();
      })
      .catch(function (error) {
        uploadedResources = [];
        renderResourceList();
        setStatus('resource-status', error.message || 'Resources failed to load.', 'error');
      });
  }

  function handleSubmission(event) {
    event.preventDefault();
    setStatus('submission-status', 'Uploading submission…');

    var form = event.currentTarget;
    var fileInput = byId('submission-file');
    var fileMeta = null;
    var labSelect = byId('submission-lab');
    var useCaseSelect = byId('submission-use-case');

    var filePromise = Promise.resolve();
    if (fileInput && fileInput.files && fileInput.files[0]) {
      filePromise = createUploadSession(fileInput.files[0], 'submission', '').then(function (session) {
        return uploadDirect(session, fileInput.files[0]).then(function () {
          fileMeta = session;
        });
      });
    }

    filePromise.then(function () {
      var selectedLab = labSelect && labSelect.selectedOptions && labSelect.selectedOptions[0] ? labSelect.selectedOptions[0].textContent : '';
      var selectedUseCase = useCaseSelect && useCaseSelect.selectedOptions && useCaseSelect.selectedOptions[0] ? useCaseSelect.selectedOptions[0].textContent : '';
      return readJson('/api/raven-course/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: byId('submission-name').value.trim(),
          email: byId('submission-email').value.trim(),
          team: '',
          role: '',
          block_id: '',
          block_title: '',
          lab_id: labSelect ? labSelect.value : '',
          lab_title: selectedLab,
          use_case_id: useCaseSelect ? useCaseSelect.value : '',
          use_case_title: selectedUseCase,
          notes: byId('submission-notes').value.trim(),
          link_url: byId('submission-link').value.trim(),
          file_url: fileMeta ? fileMeta.fileUrl : '',
          file_name: fileMeta ? fileMeta.fileName : '',
          storage_path: fileMeta ? fileMeta.storagePath : '',
          content_type: fileInput && fileInput.files && fileInput.files[0] ? (fileInput.files[0].type || '') : ''
        })
      });
    }).then(function () {
      form.reset();
      setStatus('submission-status', 'Submission posted.', 'success');
      return fetchSubmissions();
    }).catch(function (error) {
      setStatus('submission-status', error.message, 'error');
    });
  }

  function handleResourceUpload(event) {
    event.preventDefault();
    setStatus('resource-status', 'Uploading resource…');

    var fileInput = byId('resource-file');
    var token = byId('resource-token').value.trim();

    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      setStatus('resource-status', 'Choose a resource file to upload.', 'error');
      return;
    }

    createUploadSession(fileInput.files[0], 'resource', token).then(function (uploadPayload) {
      return uploadDirect(uploadPayload, fileInput.files[0]).then(function () {
        return uploadPayload;
      });
    }).then(function (uploadPayload) {
      return readJson('/api/raven-course/resources', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-raven-resource-token': token
        },
        body: JSON.stringify({
          title: byId('resource-title').value.trim() || fileInput.files[0].name,
          description: byId('resource-description').value.trim(),
          category: byId('resource-category').value.trim() || 'NotebookLM Resource',
          source: 'course',
          kind: mediaKind({ file_name: fileInput.files[0].name, content_type: fileInput.files[0].type || '' }),
          file_url: uploadPayload.fileUrl,
          file_name: uploadPayload.fileName,
          storage_path: uploadPayload.storagePath,
          content_type: fileInput.files[0].type || ''
        })
      });
    }).then(function () {
      event.currentTarget.reset();
      setStatus('resource-status', 'Resource added.', 'success');
      return fetchResources();
    }).catch(function (error) {
      setStatus('resource-status', error.message, 'error');
    });
  }

  function setupResourcePanel() {
    var openButton = byId('open-resource-form');
    var closeButton = byId('close-resource-form');
    var panel = byId('resource-form-panel');
    if (!openButton || !panel) return;

    openButton.addEventListener('click', function () {
      panel.hidden = false;
      openButton.hidden = true;
      var titleField = byId('resource-title');
      if (titleField) titleField.focus();
    });

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        panel.hidden = true;
        openButton.hidden = false;
        openButton.focus();
      });
    }
  }

  function forceDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.setItem('luxor-theme', 'dark');
    } catch (_) {
      // no-op
    }
  }

  function init() {
    forceDarkTheme();
    readJson(COURSE_BASE + '/data/raven-course-manifest.json').then(function (payload) {
      manifest = payload;

      byId('course-title').textContent = manifest.courseTitle;
      byId('course-subtitle').textContent = manifest.courseSubtitle;
      byId('course-badge').textContent = manifest.courseBadge;
      var summaryEl = byId('course-summary');
      if (summaryEl && summaryEl.getAttribute('data-raven-summary') === 'manifest') {
        summaryEl.textContent = manifest.summary;
      }
      byId('page-title').textContent = manifest.courseTitle;

      renderStats();
      renderDays();
      renderUseCases();
      renderSubmissionOptions();
      renderResourceList();

      var submissionForm = byId('submission-form');
      if (submissionForm) {
        submissionForm.addEventListener('submit', handleSubmission);
        fetchSubmissions();
      }

      var resourceForm = byId('resource-form');
      if (resourceForm) {
        setupResourcePanel();
        resourceForm.addEventListener('submit', handleResourceUpload);
        fetchResources();
      }
    }).catch(function (error) {
      var host = byId('course-flow');
      if (host) {
        host.innerHTML = '<div class="raven-empty-state">' + escapeHtml(error.message) + '</div>';
      }
      byId('course-summary').textContent = 'Raven course manifest failed to load.';
      byId('course-subtitle').textContent = 'Load error';
      byId('course-badge').textContent = 'Manifest error';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
