export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>健康食刻</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          :root {
            --primary: #a1c4bb;
            --primary-dark: #87aeb7;
            --secondary: #A7D7C5;
            --light: #FFFFFF;
            --dark: rgba(0, 0, 0, 0.7);
            --gray: rgba(0, 0, 0, 0.5);
            --success: #2a9d8f;
            --warning: #e9c46a;
            --breakfast: #fbd989;
            --lunch: #51cbaf;
            --dinner: #2fafd9;
            --border: #e2e2e2;
            --tag: #e9f8f4
          }
      
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Nunito', 'Quicksand', sans-serif;
          }
      
          body {
            background: linear-gradient(135deg, var(--light) 0%, var(--secondary) 100%);
            min-height: 100vh;
            padding: 20px;
            color: var(--dark);
            display: flex;
            justify-content: center;
            align-items: center;
          }
      
          .container {
            width: 100%;
            max-width: 1500px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 85vh;
          }
      
          header {
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary) 100%);
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--light);
          }
      
          .logo-area {
            display: flex;
            align-items: center;
            gap: 15px;
          }
      
          .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: bold;
          }
      
          .logo i {
            font-size: 1.8rem;
          }
      
          .login-btn {
            background: rgba(255, 255, 255, 0.2);
            color: var(--light);
            border: none;
            padding: 8px 15px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
          }
      
          .login-btn:hover {
            background: rgba(255, 255, 255, 0.3);
          }
      
          .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }
      
          .user-avatar {
            width: 35px;
            height: 35px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            color: var(--light);
          }
      
          .nav-tabs {
            display: flex;
            gap: 5px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 5px;
          }
      
          .nav-tab {
            padding: 8px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
          }
      
          .nav-tab.active {
            background: var(--light);
            color: var(--primary-dark);
          }
      
          .tab-content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
      
          .tab-pane {
            display: none;
            flex: 1;
            overflow-y: auto;
            padding: 20px;
          }
      
          .tab-pane.active {
            display: block;
          }
      
          /* AI聊天对话框样式 */
          .fas {
            font-size: 15px;
          }
      
          .sidebar {
            width: 250px;
            background: var(--light) !important;
            padding: 0px !important;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
      
          .section {
            padding: 15px !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }
      
          .preference-section {
            background: var(--light);
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }
      
          .preference-section h3 {
            margin-bottom: 12px;
            color: var(--primary-dark);
            display: flex;
            align-items: center;
            gap: 8px;
          }
      
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
      
          .tag {
            background: #e6f7f2;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 0.85rem;
            color: var(--primary-dark);
            cursor: pointer;
          }
      
          .tag.active {
            background: var(--secondary);
            color: var(--light);
          }
      
          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: var(--light);
            border-radius: 15px;
          }
      
          .message {
            max-width: 70%;
            padding: 15px;
            border-radius: 18px;
            position: relative;
            animation: fadeIn 0.3s ease;
          }
      
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
      
          .ai-message {
            align-self: flex-start;
            background: var(--primary);
            color: var(--light);
            border-radius: 10px;
          }
      
          .user-message {
            align-self: flex-end;
            background: var(--primary);
            color: var(--light);
            border-radius: 10px;
          }
      
          .message-content {
            margin-bottom: 5px;
            white-space: pre-line;
          }
      
          .message-time {
            font-size: 0.7rem;
            opacity: 0.8;
            text-align: right;
          }
      
          .character {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
      
          .character-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            font-size: 1.5rem;
            border: 2px solid var(--light);
          }
      
          .ai-avatar {
            background: var(--primary-dark);
          }
      
          .user-avatar-sm {
            background: var(--primary-dark);
          }
      
          .chat-input {
            display: flex;
            gap: 10px;
            padding: 15px 0;
            align-items: center;
          }
      
          .chat-input input {
            flex: 1;
            padding: 12px 18px;
            border: 2px solid var(--border);
            border-radius: 15px;
            outline: none;
            font-size: 1rem;
          }
      
          .chat-input input:focus {
            border-color: var(--primary);
          }
      
          .chat-input input::placeholder {
            color: #ccc;
          }
      
          .send-btn {
            background: var(--primary);
            color: var(--light);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            transition: transform 0.2s;
          }
      
          .send-btn:hover {
            transform: scale(1.05);
          }
      
          .quick-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 10px;
          }
      
          .quick-tag {
            background: #e6f7f2;
            color: var(--primary-dark);
            padding: 8px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
          }
      
          .recipe-card {
            background: var(--light);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            margin-top: 15px;
            animation: slideIn 0.5s ease;
          }
      
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
      
          .recipe-image {
            height: 300px;
            background: linear-gradient(45deg, var(--primary), var(--primary-dark));
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--light);
            font-size: 3rem;
          }
      
          .recipe-image img {
            width: 100%;
            height: 100%;
          }
      
          .recipe-content {
            padding: 15px;
          }
      
          .recipe-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #5c4d43;
          }
      
          .nutrition-info {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
          }
      
          .nutrition-item {
            text-align: center;
          }
      
          .nutrition-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--primary-dark);
          }
      
          .nutrition-label {
            font-size: 0.8rem;
            color: #8d7b6d;
          }
      
          .health-tips {
            background: #e6f7f2;
            padding: 12px;
            border-radius: 10px;
            margin-top: 15px;
            font-size: 0.9rem;
            color: var(--primary-dark);
          }
      
          .dizzy-effect {
            animation: dizzy 1s infinite;
          }
      
          @keyframes dizzy {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
      
          .thinking {
            display: flex;
            align-items: center;
            color: var(--light);
            font-style: italic;
            margin: 10px 0;
          }
      
          .thinking-dots {
            display: flex;
            margin-left: 10px;
          }
      
          .thinking-dots span {
            width: 5px;
            height: 5px;
            background: var(--primary-dark);
            border-radius: 50%;
            margin: 0 2px;
            animation: bounce 1.5s infinite;
          }
      
          .thinking-dots span:nth-child(2) {
            animation-delay: 0.2s;
          }
      
          .thinking-dots span:nth-child(3) {
            animation-delay: 0.4s;
          }
      
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
      
          /* 模态框样式 */
          .analysis-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
      
          .analysis-modal.active {
            display: flex;
          }
      
          .analysis-modal-content {
            background: var(--light);
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            animation: modalFadeIn 0.3s ease;
          }
      
          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
      
          .analysis-modal-header {
            padding: 15px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
      
          .analysis-modal-title {
            font-size: 1.1rem;
            padding: 0px 5px;
            color: var(--dark);
          }
      
          .analysis-modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray);
            padding: 0px 5px;
          }
      
          .analysis-modal-body {
            padding: 20px;
          }
      
          .image-preview {
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 20px;
          }
      
          .image-preview img {
            width: 300px;
            height: 300px;
            object-fit: cover;
          }
      
          .analysis-loading {
            text-align: center;
            padding: 30px;
            color: var(--gray);
          }
      
          .analysis-loading .thinking {
            justify-content: center;
          }
      
          .analysis-result {
            display: none;
          }
      
          .food-list {
            margin-bottom: 20px;
          }
      
          .food-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: var(--tag);
            border-radius: 10px;
            margin-bottom: 10px;
            color: var(--primary-dark);
          }
      
          .food-name {
            font-weight: bold;
          }
      
          .count-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--primary);
            color: var(--light);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
      
          .nutrition-summary {
            background: var(--light);
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          }
      
          .nutrition-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: var(--primary-dark);
            text-align: center;
          }
      
          .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
      
          .nutrition-item {
            text-align: center;
            padding: 15px;
            background: var(--light);
            border-radius: 10px;
          }
      
          .nutrition-value {
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--primary-dark);
          }
      
          .nutrition-label {
            font-size: 0.9rem;
            color: var(--gray);
          }
      
          .analysis-modal-actions {
            display: flex;
            gap: 15px;
            padding: 20px;
            border-top: 1px solid var(--border);
          }
      
          .btn {
            padding: 12px 25px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
          }
      
          .btn-primary {
            background: var(--primary);
            color: var(--light);
          }
      
          .btn-primary:hover {
            background: var(--primary-dark);
          }
      
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
      
          @media (max-width: 600px) {
            .meal-type-selector {
              flex-direction: column;
              align-items: center;
            }
      
            .nutrition-grid {
              grid-template-columns: 1fr;
            }
      
            .analysis-modal-actions {
              flex-direction: column;
            }
          }
      
          /* 收藏食谱样式 */
          .recipe-title {
            font-size: 1.3rem;
            color: var(--dark);
          }
      
          .recipe-meta {
            display: flex;
            align-items: center;
            gap: 15px;
            color: var(--gray);
            font-size: 0.9rem;
          }
      
          .recipe-calories {
            color: var(--primary-dark);
            font-weight: bold;
          }
      
          .recipe-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
      
          .ingredients-section, .steps-section {
            background: #f8f3e9;
            border-radius: 10px;
            padding: 15px;
          }
      
          .section-title {
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: var(--primary-dark);
            display: flex;
            align-items: center;
            gap: 8px;
          }
      
          .ingredients-list {
            list-style-type: none;
          }
      
          .ingredients-list li {
            padding: 5px 0;
            border-bottom: 1px dashed #e3d6bf;
          }
      
          .steps-list {
            list-style-type: decimal;
            padding-left: 20px;
          }
      
          .steps-list li {
            padding: 8px 0;
          }
      
          .recipe-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border);
          }
      
          .nutrition-info {
            display: flex;
            gap: 15px;
          }
      
          .nutrition-item {
            text-align: center;
            padding: 8px 12px;
            background: var(--light);
            border-radius: 10px;
            min-width: 70px;
          }
      
          .nutrition-value {
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--primary-dark);
          }
      
          .nutrition-label {
            font-size: 0.8rem;
            color: var(--gray);
          }
      
          .health-advice {
            font-style: italic;
            color: var(--success);
            background: rgba(42, 157, 143, 0.1);
            padding: 8px 12px;
            border-radius: 10px;
            max-width: 300px;
          }
      
          /* 饮食记录样式 */
          .calendar-container {
            display: flex;
            gap: 20px;
            height: 100%;
          }
      
          .calendar-sidebar {
            width: 300px;
            background: var(--light);
            border-radius: 15px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
      
          .calendar-main {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .total-calories {
            font-size: 1.1rem;
            color: var(--primary);
          }
      
          .upload-area {
            border: 2px dashed var(--secondary);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
          }
      
          .upload-area:hover {
            border-color: var(--primary);
            background: rgba(167, 215, 197, 0.2);
          }
      
          .upload-area i {
            font-size: 3rem;
            color: var(--secondary);
            margin-bottom: 15px;
          }
      
          .meal-type-selector {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
      
          .meal-type {
            padding: 12px 15px;
            background: var(--light);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 10px;
          }
      
          .meal-type.active {
            background: var(--primary);
            color: var(--light);
          }
      
          .meal-type.breakfast .meal-icon {
            color: var(--breakfast);
          }
      
          .meal-type.lunch .meal-icon {
            color: var(--lunch);
          }
      
          .meal-type.dinner .meal-icon {
            color: var(--dinner);
          }
      
          .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
      
          .month-nav {
            display: flex;
            align-items: center;
            gap: 15px;
          }
      
          .nav-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--light);
            cursor: pointer;
            transition: all 0.3s;
          }
      
          .nav-btn:hover {
            background: var(--primary);
            color: var(--light);
          }
      
          .current-month {
            font-size: 1.5rem;
            font-weight: bold;
          }
      
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            flex: 1;
          }
      
          .calendar-day {
            aspect-ratio: 1/1;
            background: var(--light);
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: all 0.3s;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
          }
      
          .calendar-day:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
      
          .day-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
      
          .day-number {
            font-weight: bold;
          }
      
          .day-calories {
            font-size: 0.8rem;
            color: var(--primary-dark);
            font-weight: bold;
          }
      
          .day-meals {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 0.8rem;
          }
      
          .meal-breakfast {
            color: var(--breakfast);
            background: rgba(255, 209, 102, 0.2);
            padding: 2px 5px;
            border-radius: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
      
          .meal-lunch {
            color: var(--lunch);
            background: rgba(6, 214, 160, 0.2);
            padding: 2px 5px;
            border-radius: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
      
          .meal-dinner {
            color: var(--dinner);
            background: rgba(17, 138, 178, 0.2);
            padding: 2px 5px;
            border-radius: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
      
          /* 详情卡片样式 */
          .detail-card {
            position: absolute;
            background: var(--light);
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            padding: 15px;
            z-index: 100;
            min-width: 250px;
            max-width: 300px;
            display: none;
            animation: fadeIn 0.3s ease;
          }
      
          .detail-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border);
          }
      
          .detail-card-title {
            font-weight: bold;
            color: var(--primary-dark);
          }
      
          .detail-card-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--gray);
          }
      
          .detail-meal-item {
            padding: 8px 0;
            border-bottom: 1px dashed var(--border);
          }
      
          .detail-meal-item:last-child {
            border-bottom: none;
          }
      
          .detail-meal-name {
            font-weight: bold;
            margin-bottom: 5px;
          }
      
          .detail-meal-nutrition {
            display: flex;
            gap: 10px;
            font-size: 0.85rem;
            color: var(--gray);
          }
      
          /* 登录模态框 */
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
      
          .modal.active {
            display: flex;
          }
      
          .modal-content {
            background: var(--light);
            border-radius: 15px;
            padding: 30px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
          }
      
          .modal-header {
            margin-bottom: 20px;
            text-align: center;
          }
      
          .modal-title {
            font-size: 1.5rem;
            color: var(--primary-dark);
          }
      
          .form-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--dark);
          }
      
          .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid var(--border);
            border-radius: 10px;
            outline: none;
            font-size: 1rem;
          }
      
          .form-group input:focus {
            border-color: var(--primary);
          }

          .form-group input::placeholder {
            color: #ccc;
          }
      
          .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
      
          .btn {
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
          }
      
          .btn-primary {
            background: var(--primary);
            color: var(--light);
          }
      
          .btn-primary:hover {
            background: var(--primary-dark);
          }
      
          .error-message {
            color: var(--gray);
            font-size: 0.9rem;
            margin-top: 10px;
            display: none;
          }
      
          @media (max-width: 900px) {
            .calendar-container {
              flex-direction: column;
            }
      
            .calendar-sidebar {
              width: 100%;
            }
      
            .recipe-content {
              grid-template-columns: 1fr;
            }
      
            .container {
              height: auto;
              min-height: 85vh;
            }
      
            body {
              padding: 10px;
              align-items: flex-start;
            }
          }
        </style>
      </head>
      <body>
      <div class="container">
        <header>
          <div class="logo-area">
            <div class="logo">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="nav-tabs">
              <div class="nav-tab active" data-tab="chat">推荐食谱</div>
              <div class="nav-tab" data-tab="calendar">饮食记录</div>
            </div>
          </div>
          <div class="user-info" id="userInfo" style="display: none;">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <span id="userName">用户</span>
            <button class="login-btn" id="logoutBtn">退出</button>
          </div>
          <div class="user-info" id="loginInfo">
            <button class="login-btn" id="loginBtn">登录</button>
          </div>
        </header>
        <div class="tab-content">
          <!-- 食谱推荐 -->
          <div class="tab-pane active" id="chatTab">
            <div class="calendar-container">
              <div class="calendar-sidebar sidebar">
                <div class="preference-section">
                  <h3><i class="fas fa-bullseye"></i> 健康目标</h3>
                  <div class="tags">
                    <div class="tag" data-tag="Weight Maintenance">控制体重</div>
                    <div class="tag" data-tag="Weight Loss">减肥减脂</div>
                    <div class="tag" data-tag="Weight Gain">增重增肌</div>
                    <div class="tag" data-tag="Better Sleep">改善睡眠</div>
                  </div>
                </div>
                <div class="preference-section">
                  <h3><i class="fas fa-heart"></i> 饮食偏好</h3>
                  <div class="tags">
                    <div class="tag" data-tag="Vegetables">蔬菜</div>
                    <div class="tag" data-tag="Meat">肉类</div>
                    <div class="tag" data-tag="Seafood">海鲜</div>
                    <div class="tag" data-tag="Low-calorie">低卡</div>
                    <div class="tag" data-tag="High-protein">高蛋白</div>
                    <div class="tag" data-tag="Low-carb">低碳水</div>
                  </div>
                </div>
                <div class="preference-section">
                  <h3><i class="fas fa-mortar-pestle"></i> 烹饪方式</h3>
                  <div class="tags">
                    <div class="tag" data-tag="Steamed">清蒸</div>
                    <div class="tag" data-tag="Stir-fried">炒菜</div>
                    <div class="tag" data-tag="Stewed">炖汤</div>
                    <div class="tag" data-tag="Cold-dressed">凉拌</div>
                    <div class="tag" data-tag="Grilled">烧烤</div>
                    <div class="tag" data-tag="Baked">烘焙</div>
                  </div>
                </div>
              </div>
              <div class="calendar-main">
                <div class="chat-messages">
                </div>
                <div class="chat-input">
                  <input type="text" placeholder="说点什么吧..." id="messageInput">
                  <button class="send-btn" id="sendMessageBtn">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div class="quick-tags">
                  <div class="quick-tag">推荐早餐</div>
                  <div class="quick-tag">低卡食谱</div>
                  <div class="quick-tag">今天吃什么？</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 饮食记录 -->
          <div class="tab-pane" id="calendarTab">
            <div class="calendar-container">
              <div class="calendar-sidebar section">
                <h3>记录今日美食</h3>
                <div class="upload-area" id="uploadArea">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>点击或拖拽图片上传</p>
                  <input type="file" id="fileInput" accept="image/*" style="display: none;">
                </div>

                <div class="meal-type-selector">
                  <div class="meal-type breakfast active" data-type="1">
                    <i class="fas fa-egg meal-icon"></i>
                    <span>早餐</span>
                  </div>
                  <div class="meal-type lunch" data-type="2">
                    <i class="fas fa-utensils meal-icon"></i>
                    <span>午餐</span>
                  </div>
                  <div class="meal-type dinner" data-type="3">
                    <i class="fas fa-moon meal-icon"></i>
                    <span>晚餐</span>
                  </div>
                </div>
              </div>

              <div class="calendar-main">
                <div class="calendar-header">
                  <div class="month-nav">
                    <div class="nav-btn" id="prevMonth">
                      <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="current-month" id="currentMonth">2023年10月</div>
                    <div class="nav-btn" id="nextMonth">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  <div class="total-calories">
                    本月总热量: <span id="monthTotal">0</span> kcal
                  </div>
                </div>

                <div class="calendar" id="calendarContainer">
                  <!-- 日历将通过JS动态生成 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详情卡片 -->
      <div class="detail-card" id="detailCard">
        <div class="detail-card-header">
          <div class="detail-card-title" id="detailCardDate"></div>
        </div>
        <div class="detail-card-body" id="detailCardBody">
          <!-- 详情内容将通过JS动态生成 -->
        </div>
      </div>

      <!-- 登录模态框 -->
      <div class="modal" id="loginModal">
        <div class="analysis-modal-content">
          <div class="analysis-modal-header">
            <h2 class="analysis-modal-title">登录</h2>
            <button class="analysis-modal-close">&times;</button>
          </div>
          <div class="analysis-modal-body">
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input type="text" id="nickname" placeholder="请输入您的昵称">
              <div class="error-message" id="nicknameError">该昵称已被占用</div>
            </div>
          </div>
          <div class="analysis-modal-actions">
            <button class="btn btn-primary" id="registerBtn">注册</button>
            <button class="btn btn-primary" id="confirmLoginBtn">登录</button>
          </div>
        </div>
      </div>

      <!-- 营养分析模态框 -->
      <div class="analysis-modal" id="analysisModal">
        <div class="analysis-modal-content">
          <div class="analysis-modal-header">
            <h2 class="analysis-modal-title">营养分析</h2>
          </div>
          <div class="analysis-modal-body">
            <div class="image-preview">
              <img id="previewImage" src="" alt="预览图">
            </div>
            <div class="analysis-loading" id="analysisLoading">
              <div class="thinking">
                <div class="character-avatar ai-avatar dizzy-effect">
                  <i class="fas fa-robot"></i>
                </div>
                <div class="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div class="analysis-result" id="analysisResult">
              <div class="food-list" id="foodList">
                <!-- 食物列表将通过JS动态生成 -->
              </div>
              <div class="nutrition-summary">
                <div class="nutrition-title">营养分析</div>
                <div class="nutrition-grid">
                  <div class="nutrition-item">
                    <div class="nutrition-value" id="totalCalories">0</div>
                    <div class="nutrition-label">总热量 (kcal)</div>
                  </div>
                  <div class="nutrition-item">
                    <div class="nutrition-value" id="totalProtein">0</div>
                    <div class="nutrition-label">蛋白质 (g)</div>
                  </div>
                  <div class="nutrition-item">
                    <div class="nutrition-value" id="totalCarbs">0</div>
                    <div class="nutrition-label">碳水 (g)</div>
                  </div>
                  <div class="nutrition-item">
                    <div class="nutrition-value" id="totalFat">0</div>
                    <div class="nutrition-label">脂肪 (g)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="analysis-modal-actions">
            <button class="btn btn-primary" id="saveBtn">保存记录</button>
            <button class="btn btn-primary" id="cancelBtn">取消</button>
          </div>
        </div>
      </div>

      <script>
        let currentUser = null;
        let preference = '';
        let currentMealType = 1;
        let currentFoodData = [];
        let foodRecords = [];
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        // DOM元素
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        const loginInfo = document.getElementById('loginInfo');
        const userName = document.getElementById('userName');
        const loginModal = document.getElementById('loginModal');
        const registerBtn = document.getElementById('registerBtn');
        const confirmLoginBtn = document.getElementById('confirmLoginBtn');
        const nicknameInput = document.getElementById('nickname');
        const nicknameError = document.getElementById('nicknameError');

        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const chatMessages = document.querySelector('.chat-messages');

        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const analysisModal = document.getElementById('analysisModal');
        const modalClose = document.querySelector('.analysis-modal-close');
        const previewImage = document.getElementById('previewImage');
        const analysisLoading = document.getElementById('analysisLoading');
        const analysisResult = document.getElementById('analysisResult');
        const foodList = document.getElementById('foodList');
        const totalCalories = document.getElementById('totalCalories');
        const totalProtein = document.getElementById('totalProtein');
        const totalCarbs = document.getElementById('totalCarbs');
        const totalFat = document.getElementById('totalFat');
        const saveBtn = document.getElementById('saveBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        const currentMonthElement = document.getElementById('currentMonth');
        const calendarContainer = document.getElementById('calendarContainer');
        const monthTotal = document.getElementById('monthTotal');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');

        const detailCard = document.getElementById('detailCard');
        const detailCardDate = document.getElementById('detailCardDate');
        const detailCardBody = document.getElementById('detailCardBody');

        // 初始化页面
        document.addEventListener('DOMContentLoaded', function() {
          // 检查用户登录状态
          checkLoginStatus();

          // 初始化聊天
          addMessage('Hi，我是你的AI健康饮食助手～今天有什么想吃的吗？或者我来帮你决定？', 'ai');

          // 初始化标签切换
          document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', function() {
              document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
              this.classList.add('active');

              const tabId = this.getAttribute('data-tab') + 'Tab';
              document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
              });
              document.getElementById(tabId).classList.add('active');
            });
          });

          // 初始化登录按钮
          loginBtn.addEventListener('click', showLoginModal);
          logoutBtn.addEventListener('click', logout);
          registerBtn.addEventListener('click', handleRegister);
          confirmLoginBtn.addEventListener('click', handleLogin);

          // 初始化聊天功能
          sendMessageBtn.addEventListener('click', sendMessage);
          messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              sendMessage();
            }
          });

          // 初始化偏好标签
          document.querySelectorAll('.tag').forEach(type => {
            type.addEventListener('click', function() {
              if (this.classList.contains('active')) {
                this.classList.remove('active');
              } else {
                this.classList.add('active');
              }
              const preferenceTags = Array.from(document.querySelectorAll('.tag.active'))
                      .map(tag => tag.getAttribute('data-tag').trim());
              preference = preferenceTags.join(', ');
            });
          });

          // 初始化餐次选择
          document.querySelectorAll('.meal-type').forEach(type => {
            type.addEventListener('click', function() {
              document.querySelectorAll('.meal-type').forEach(t => t.classList.remove('active'));
              this.classList.add('active');
              currentMealType = this.getAttribute('data-type');
            });
          });

          document.querySelectorAll('.quick-tag').forEach(tag => {
            tag.addEventListener('click', function() {
              addMessage(this.textContent, 'user');
              generateRecipe(this.textContent);
            });
          });

          // 初始化文件上传
          uploadArea.addEventListener('click', function() {
            fileInput.click();
          });

          fileInput.addEventListener('change', function() {
            if (this.files.length) {
              handleFileUpload(this.files[0]);
            }
          });

          // 初始化模态框关闭按钮
          modalClose.addEventListener('click', function() {
            loginModal.classList.remove('active');
          });

          // 初始化保存按钮
          saveBtn.addEventListener('click', saveFoodRecord);
          cancelBtn.addEventListener('click', cancelFoodRecord);

          // 初始化日历导航
          prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
              currentMonth = 11;
              currentYear--;
            }
            renderCalendar();
          });

          nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
              currentMonth = 0;
              currentYear++;
            }
            renderCalendar();
          });

          // 点击页面任意地方关闭详情卡片
          document.addEventListener('click', function(e) {
            if (!detailCard.contains(e.target) && !e.target.closest('.calendar-day')) {
              detailCard.style.display = 'none';
            }
          });

          // 初始渲染收藏日历
          renderCalendar();
        });

        // 检查登录状态
        function checkLoginStatus() {
          const user = getCookie('user');
          if (user) {
            const arr = user.split("_")
            currentUser = {"user_id": arr[0], "user_name": arr[1]};
            userInfo.style.display = 'flex';
            loginInfo.style.display = 'none';
            userName.textContent = arr[1];
          } else {
            // 未登录状态
            userInfo.style.display = 'none';
            loginInfo.style.display = 'flex';
          }
          renderCalendar();
        }

        // 显示登录模态框
        function showLoginModal() {
          loginModal.classList.add('active');
        }

        // 隐藏登录模态框
        function hideLoginModal() {
          loginModal.classList.remove('active');
          nicknameError.style.display = 'none';
        }

        // 登录
        function handleLogin() {
          const nickname = nicknameInput.value.trim();
          if (!nickname) {
            nicknameError.textContent = '请输入昵称';
            nicknameError.style.display = 'block';
            return;
          }

          login(nickname, 1);
        }

        // 注册
        function handleRegister() {
          const nickname = nicknameInput.value.trim();
          if (!nickname) {
            nicknameError.textContent = '请输入昵称';
            nicknameError.style.display = 'block';
            return;
          }

          login(nickname, 2);
        }

        async function login(nickname, type) {
          try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "user_name": nickname,
                "type": type,
              }),
            });

            const data = await response.json();
            if (data.message != null) {
              nicknameError.textContent = '用户已存在';
              nicknameError.style.display = 'block';
              return;
            }

            if (data.user_id != null) {
              setCookie('user', data.user_id + "_" + data.user_name, 30);
              currentUser = {"user_id": data.user_id, "user_name": data.user_name};
              userInfo.style.display = 'flex';
              loginInfo.style.display = 'none';
              userName.textContent = data.user_name;
            }

            // 隐藏模态框
            hideLoginModal();
            // 渲染日历
            renderCalendar();
          } catch (error) {
            console.log(error);
          }
        }

        // 退出登录
        function logout() {
          eraseCookie('user');
          currentUser = null;
          userInfo.style.display = 'none';
          loginInfo.style.display = 'flex';
          userName.textContent = '';
          renderCalendar();
        }

        // 发送消息
        function sendMessage() {
          const message = messageInput.value.trim();
          if (!message) return;

          if (!currentUser) {
            showLoginModal();
            return;
          }

          // 添加用户消息到聊天
          addMessage(message, 'user');
          generateRecipe(message);
          messageInput.value = '';
        }

        async function generateRecipe(input) {
          addThinking();

          try {
            const response = await fetch('/api/recipe/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ input, preference }),
            });
            const data = await response.json();
            addMessage(formatText(data.response), 'ai');
          } catch (error) {
            addMessage('system error', 'ai');
          }

          removeThinking();
        }

        function formatText(text) {
          let result = text.replace(/\\*/g, '').replace(/\\#/g, '');
          return result;
        }

        // 添加消息到聊天
        function addMessage(text, sender) {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message');
          messageDiv.classList.add(sender + '-message');

          const now = new Date();
          const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

          messageDiv.innerHTML = \`
                                  <div class="character">
                                      <div class="character-avatar \${sender === 'ai' ? 'ai-avatar' : 'user-avatar-sm'}">
                                          <i class="fas fa-\${sender === 'ai' ? 'robot' : 'user'}"></i>
                                      </div>
                                  </div>
                                  <div class="message-content">\${text}</div>
                                  <div class="message-time">\${time}</div>
                                  \`;
          chatMessages.appendChild(messageDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function addThinking() {
          const thinkingDiv = document.createElement('div');
          thinkingDiv.classList.add('thinking');
          thinkingDiv.innerHTML = \`
                                  <div class="character-avatar ai-avatar dizzy-effect">
                                      <i class="fas fa-robot"></i>
                                  </div>
                                  <div class="thinking-dots">
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                  </div>
                                  \`;

          chatMessages.appendChild(thinkingDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeThinking() {
          const thinking = document.querySelector('.thinking');
          if (thinking) {
            thinking.remove();
          }
        }

        // 处理文件上传
        function handleFileUpload(file) {
          if (!file.type.match('image.*')) {
            fileInput.value = '';
            return;
          }

          if (!currentUser) {
            fileInput.value = '';
            showLoginModal();
            return;
          }

          // 创建文件预览
          const reader = new FileReader();
          reader.onload = function(e) {
            previewImage.src = e.target.result;

            // 显示模态框
            analysisModal.classList.add('active');
            analysisLoading.style.display = 'block';
            analysisResult.style.display = 'none';

            analyzeFoodImage(file);
          };
          reader.readAsDataURL(file);
        }

        // 模拟分析食物图片
        async function analyzeFoodImage(file) {
          try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/food/upload', {
              method: 'POST',
              body: formData
            });

            const data = await response.json();
            // 保存当前食物数据
            currentFoodData = data.response;

            // 渲染食物列表
            renderFoodList();

            // 计算并显示总营养
            calculateTotalNutrition();

            // 显示分析结果
            analysisLoading.style.display = 'none';
            analysisResult.style.display = 'block';

            // 清空文件
            fileInput.value = '';
          } catch (error) {
            console.log(error);
          }
        }

        // 渲染食物列表
        function renderFoodList() {
          foodList.innerHTML = '';

          let foods = '未发现食物';
          let foodArray = [];
          currentFoodData.forEach((food, index) => {
            foodArray[index] = food.food;
          });
          if (foodArray.length > 0) {
            foods = foodArray.join('、');
          }
          const foodItem = document.createElement('div');
          foodItem.className = 'food-item';
          foodItem.innerHTML = \`<div class="food-name">\${foods}</div>\`;
          foodList.appendChild(foodItem);
        }

        // 计算总营养
        function calculateTotalNutrition() {
          let calories = 0;
          let protein = 0;
          let carbs = 0;
          let fat = 0;

          currentFoodData.forEach(food => {
            calories += food.nutrition.calories * food.count;
            protein += food.nutrition.protein * food.count;
            carbs += food.nutrition.carbs * food.count;
            fat += food.nutrition.fat * food.count;
          });

          totalCalories.textContent = calories;
          totalProtein.textContent = protein.toFixed(1);
          totalCarbs.textContent = carbs.toFixed(1);
          totalFat.textContent = fat.toFixed(1);
        }

        // 保存食物记录
        async function saveFoodRecord() {
          // 构建保存数据
          const food = {
            user_id: currentUser.user_id,
            type: currentMealType,
            content: currentFoodData
          };

          try {
            const response = await fetch('/api/food/save', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(food),
            });

            const data = await response.json();

            // 更新收藏日历
            renderCalendar();

            // 关闭模态框
            analysisModal.classList.remove('active');
          } catch (error) {
            console.log(error);
          }
        }

        // 取消保存食物记录
        function cancelFoodRecord(){
          analysisModal.classList.remove('active');
        }

        // 渲染日历
        async function renderCalendar() {
          foodRecords = [];
          if (currentUser) {
            try {
              const response = await fetch('/api/food/query', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: currentUser.user_id}),
              });

              foodRecords = await response.json();

              // 关闭模态框
              analysisModal.classList.remove('active');
            } catch (error) {
              console.log(error);
            }
          }

          // 更新当前月份显示
          currentMonthElement.textContent = \`\${currentYear}年\${currentMonth + 1}月\`;

          // 清空日历容器
          calendarContainer.innerHTML = '';

          // 计算本月第一天是星期几
          const firstDay = new Date(currentYear, currentMonth, 1).getDay();

          // 计算本月有多少天
          const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

          // 创建日历标题行（星期几）
          const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
          for (let i = 0; i < 7; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.innerHTML = \`<div class="day-header"><span class="day-number">\${daysOfWeek[i]}</span></div>\`;
            dayCell.style.background = 'transparent';
            dayCell.style.boxShadow = 'none';
            dayCell.style.cursor = 'default';
            dayCell.style.height = '50px';
            calendarContainer.appendChild(dayCell);
          }

          // 创建空白单元格（本月第一天之前的日期）
          for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day';
            emptyCell.style.visibility = 'hidden';
            calendarContainer.appendChild(emptyCell);
          }

          // 计算本月总热量
          let monthlyCalories = 0;

          // 创建日期单元格
          for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = \`\${currentYear}-\${String(currentMonth + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;

            // 获取当天的饮食记录
            const dayRecords = foodRecords.filter(record =>
                    record.user_id === currentUser.user_id &&
                    record.date === dateStr
            );

            // 按餐次分组
            const breakfastRecords = dayRecords.filter(r => r.mealType === 1);
            const lunchRecords = dayRecords.filter(r => r.mealType === 2);
            const dinnerRecords = dayRecords.filter(r => r.mealType === 3);

            // 计算当天总热量
            const dayCalories = dayRecords.reduce((sum, record) => sum + record.calories, 0);
            monthlyCalories += dayCalories;

            // 创建日期单元格
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.setAttribute('data-date', dateStr);

            let mealsHTML = '';

            // 早餐摘要
            if (breakfastRecords.length > 0) {
              const totalCalories = breakfastRecords.reduce((sum, record) => sum + record.calories, 0);
              mealsHTML += \`<div class="meal-breakfast">早餐: \${breakfastRecords[0].name}... (\${totalCalories}kcal)</div>\`;
            }

            // 午餐摘要
            if (lunchRecords.length > 0) {
              const totalCalories = lunchRecords.reduce((sum, record) => sum + record.calories, 0);
              mealsHTML += \`<div class="meal-lunch">午餐: \${lunchRecords[0].name}... (\${totalCalories}kcal)</div>\`;
            }

            // 晚餐摘要
            if (dinnerRecords.length > 0) {
              const totalCalories = dinnerRecords.reduce((sum, record) => sum + record.calories, 0);
              mealsHTML += \`<div class="meal-dinner">晚餐: \${dinnerRecords[0].name}... (\${totalCalories}kcal)</div>\`;
            }

            dayCell.innerHTML = \`<div class="day-header">
                                      <span class="day-number">\${day}</span>
                                      <span class="day-calories">\${dayCalories > 0 ? dayCalories + 'kcal' : ''}</span>
                                  </div>
                                  <div class="day-meals">
                                  \${mealsHTML || '<div style="color: #ccc; font-size: 0.8rem;">无记录</div>'}
                                  </div>
                                  \`;

            // 添加点击事件显示详情卡片
            if (dayRecords.length > 0) {
              dayCell.addEventListener('click', function(e) {
                showDetailCard(dateStr, dayRecords, e);
              });
            }

            calendarContainer.appendChild(dayCell);
          }

          // 更新本月总热量
          monthTotal.textContent = monthlyCalories;
        }

        // 显示详情卡片
        function showDetailCard(dateStr, records, event) {
          const date = new Date(dateStr);
          detailCardDate.textContent = \`\${date.getFullYear()}年\${date.getMonth() + 1}月\${date.getDate()}日\`;

          // 按餐次分组
          const breakfastRecords = records.filter(r => r.mealType === 1);
          const lunchRecords = records.filter(r => r.mealType === 2);
          const dinnerRecords = records.filter(r => r.mealType === 3);

          let detailHTML = '';

          // 早餐详情
          if (breakfastRecords.length > 0) {
            detailHTML += \`<div class="detail-meal-item">
                                  <div class="detail-meal-name"><i class="fas fa-egg" style="color: var(--breakfast);"></i> 早餐 （\${breakfastRecords[0].calories}kcal）</div>
                                      <div class="detail-meal-nutrition">
                                          <span>\${breakfastRecords[0].name}</span>
                                      </div>
                              </div>\`;
          }

          // 午餐详情
          if (lunchRecords.length > 0) {
            detailHTML += \`<div class="detail-meal-item">
                                  <div class="detail-meal-name"><i class="fas fa-utensils" style="color: var(--lunch);"></i> 午餐 （\${lunchRecords[0].calories}kcal）</div>
                                      <div class="detail-meal-nutrition">
                                          <span>\${lunchRecords[0].name}</span>
                                      </div>
                              </div>\`;
          }

          // 晚餐详情
          if (dinnerRecords.length > 0) {
            detailHTML += \`<div class="detail-meal-item">
                                  <div class="detail-meal-name"><i class="fas fa-moon" style="color: var(--dinner);"></i> 晚餐 （\${dinnerRecords[0].calories}kcal）</div>
                                      <div class="detail-meal-nutrition">
                                          <span>\${dinnerRecords[0].name}</span>
                                      </div>
                              </div>\`;
          }

          detailCardBody.innerHTML = detailHTML;

          // 定位详情卡片
          const rect = event.target.getBoundingClientRect();
          detailCard.style.top = \`\${rect.bottom + window.scrollY + 5}px\`;
          detailCard.style.left = \`\${rect.left + window.scrollX}px\`;

          // 显示详情卡片
          detailCard.style.display = 'block';

          // 阻止事件冒泡，避免立即触发document的点击事件
          event.stopPropagation();
        }

        function setCookie(name, value, days) {
          const d = new Date();
          d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = "expires=" + d.toUTCString();
          document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        function getCookie(name) {
          const nameEQ = name + "=";
          const ca = document.cookie.split(';');
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        }

        function eraseCookie(name) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      </script>
      </body>
      </html>
  `;

  return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    });
  }
}
